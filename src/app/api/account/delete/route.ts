import { NextResponse } from 'next/server'
import { createServerSupabase, createServiceSupabase } from '@/lib/supabase/server'
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit'
import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
    })
  : null

/**
 * GDPR: Account deletion endpoint.
 * Cancels Stripe subscription + deletes all user data + deletes auth user.
 */
export async function POST() {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit: prevent abuse
    const rl = checkRateLimit(user.id, 'api')
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitHeaders(rl) }
      )
    }

    const serviceSupabase = createServiceSupabase()

    // 1. Cancel Stripe subscription if active
    const { data: subscription } = await serviceSupabase
      .from('subscriptions')
      .select('stripe_subscription_id, status')
      .eq('user_id', user.id)
      .single()

    if (subscription?.stripe_subscription_id && stripe) {
      try {
        if (subscription.status === 'active' || subscription.status === 'trialing') {
          await stripe.subscriptions.cancel(subscription.stripe_subscription_id)
        }
      } catch (stripeError) {
        const msg = stripeError instanceof Error ? stripeError.message : 'unknown'
        console.error('[API] Stripe cancellation during deletion:', msg)
        // Continue with deletion even if Stripe fails
      }
    }

    // 2. Delete all user data (explicit order, cascade handles FKs)
    await serviceSupabase.from('analytics_events').delete().eq('user_id', user.id)
    await serviceSupabase.from('weekly_reports').delete().eq('user_id', user.id)
    await serviceSupabase.from('actions').delete().eq('user_id', user.id)
    await serviceSupabase.from('daily_logs').delete().eq('user_id', user.id)
    await serviceSupabase.from('subscriptions').delete().eq('user_id', user.id)
    await serviceSupabase.from('onboarding_profiles').delete().eq('user_id', user.id)
    await serviceSupabase.from('users').delete().eq('id', user.id)

    // 3. Delete auth user
    await serviceSupabase.auth.admin.deleteUser(user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[API] Account deletion error:', msg)
    return NextResponse.json(
      { error: 'Deletion failed — contact support@voltsleep.nl' },
      { status: 500 }
    )
  }
}
