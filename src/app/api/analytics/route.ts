import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit'
import { z } from 'zod'

const VALID_EVENTS = [
  'signup_completed',
  'onboarding_started',
  'onboarding_completed',
  'onboarding_step_completed',
  'onboarding_abandoned',
  'daily_card_viewed',
  'primary_action_completed',
  'checkin_completed_night',
  'checkin_completed_morning',
  'weekly_report_viewed',
  'paywall_viewed',
  'subscription_started',
  'subscription_canceled',
  'cognitive_switch_used',
  'demo_card_generated',
  'referral_shared',
  'referral_signup',
  'referral_converted',
  'locale_changed',
  'user_activated',
  'instant_value_preview',
  'conversion_trigger',
  'experiment_assigned',
  'energy_improvement',
  'streak_milestone',
  'share_card_generated',
] as const

const analyticsSchema = z.object({
  event: z.enum(VALID_EVENTS),
  properties: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
})

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    // Rate limit by user ID or 'anon'
    const identifier = user?.id || 'anon'
    const rl = checkRateLimit(identifier, 'analytics')
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitHeaders(rl) }
      )
    }

    const body = await request.json()
    const parsed = analyticsSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 })
    }

    await supabase.from('analytics_events').insert({
      user_id: user?.id || null,
      event: parsed.data.event,
      properties: parsed.data.properties || {},
    })

    return NextResponse.json({ success: true })
  } catch {
    // Analytics should never return errors to the client
    return NextResponse.json({ success: true })
  }
}
