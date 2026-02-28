import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createServiceSupabase } from '@/lib/supabase/server'
import { trackServerEvent } from '@/lib/analytics'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
})

export async function POST(request: Request) {
  const body = await request.text()
  const sig = headers().get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceSupabase()

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata.user_id
      if (!userId) break

      const status = subscription.status === 'active' || subscription.status === 'trialing'
        ? subscription.status === 'trialing' ? 'trialing' : 'active'
        : subscription.status === 'past_due' ? 'past_due' : 'canceled'

      await supabase.from('subscriptions').upsert({
        user_id: userId,
        stripe_customer_id: subscription.customer as string,
        stripe_subscription_id: subscription.id,
        status,
        plan: 'premium',
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      }, { onConflict: 'user_id' })

      // Update user plan
      if (status === 'active' || status === 'trialing') {
        await supabase.from('users').update({ plan: 'premium' }).eq('id', userId)
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
  }

  return NextResponse.json({ received: true })
}
