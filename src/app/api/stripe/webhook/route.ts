import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createServiceSupabase } from '@/lib/supabase/server'
import { trackServerEvent } from '@/lib/analytics'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
})

// Disable body parsing — Stripe needs the raw body for signature verification
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = await request.text()
  const sig = headers().get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  // --- Signature Verification (CRITICAL) ---
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown'
    console.error('[Webhook] Signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceSupabase()

  try {
    switch (event.type) {
      // --- Checkout completed (initial purchase) ---
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.subscription
          ? (await stripe.subscriptions.retrieve(session.subscription as string)).metadata.user_id
          : null

        if (userId && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
          await upsertSubscription(supabase, userId, subscription)
          await supabase.from('users').update({ plan: 'premium' }).eq('id', userId)
          await trackServerEvent(userId, 'subscription_started')
        }
        break
      }

      // --- Subscription lifecycle ---
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata.user_id
        if (!userId) break

        await upsertSubscription(supabase, userId, subscription)

        const isActive = subscription.status === 'active' || subscription.status === 'trialing'
        await supabase.from('users').update({
          plan: isActive ? 'premium' : 'free',
        }).eq('id', userId)

        if (isActive) {
          await trackServerEvent(userId, 'subscription_started')
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata.user_id
        if (!userId) break

        await supabase.from('subscriptions')
          .update({ status: 'canceled' })
          .eq('user_id', userId)

        await supabase.from('users')
          .update({ plan: 'free' })
          .eq('id', userId)

        await trackServerEvent(userId, 'subscription_canceled')
        break
      }

      // --- Payment failure ---
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string | null
        if (!subscriptionId) break

        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const userId = subscription.metadata.user_id
        if (!userId) break

        await supabase.from('subscriptions')
          .update({ status: 'past_due' })
          .eq('user_id', userId)

        // Don't immediately downgrade — Stripe retries. Mark past_due.
        console.warn(`[Webhook] Payment failed for user ${userId}, subscription ${subscriptionId}`)
        break
      }

      default:
        // Unhandled event type — log but don't error
        break
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'unknown'
    console.error(`[Webhook] Error handling ${event.type}:`, msg)
    // Return 200 to Stripe — retrying won't fix our code bugs
    // Log the error for monitoring
  }

  return NextResponse.json({ received: true })
}

// --- Helpers ---

async function upsertSubscription(
  supabase: ReturnType<typeof createServiceSupabase>,
  userId: string,
  subscription: Stripe.Subscription,
) {
  const status: 'active' | 'trialing' | 'past_due' | 'canceled' =
    subscription.status === 'active' ? 'active' :
    subscription.status === 'trialing' ? 'trialing' :
    subscription.status === 'past_due' ? 'past_due' : 'canceled'

  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: subscription.customer as string,
    stripe_subscription_id: subscription.id,
    status,
    plan: 'premium',
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
  }, { onConflict: 'user_id' })
}
