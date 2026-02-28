// ============================================================
// VOLT Sleep — Activation Tracking
// ============================================================
// ACTIVATED USER = Completed onboarding + Viewed first Daily Card
//                  + Completed at least 1 check-in within 48h
// ============================================================

import type { AnalyticsEvent } from '../types'

/**
 * Check if a user meets activation criteria.
 * Called after each qualifying event to detect the activation moment.
 */
export async function checkActivation(
  supabase: any,
  userId: string,
): Promise<{ activated: boolean; alreadyActivated: boolean }> {
  // Check if already activated
  const { data: user } = await supabase
    .from('users')
    .select('activated_at')
    .eq('id', userId)
    .single()

  if (user?.activated_at) {
    return { activated: false, alreadyActivated: true }
  }

  // Check all 3 criteria
  const { data: events } = await supabase
    .from('analytics_events')
    .select('event, created_at')
    .eq('user_id', userId)
    .in('event', ['onboarding_completed', 'daily_card_viewed', 'checkin_completed_morning', 'checkin_completed_night'])

  if (!events || events.length === 0) {
    return { activated: false, alreadyActivated: false }
  }

  const hasOnboarding = events.some((e: any) => e.event === 'onboarding_completed')
  const hasCard = events.some((e: any) => e.event === 'daily_card_viewed')
  const hasCheckin = events.some(
    (e: any) => e.event === 'checkin_completed_morning' || e.event === 'checkin_completed_night',
  )

  if (hasOnboarding && hasCard && hasCheckin) {
    // Check 48h window: first card view must be within 48h of onboarding
    const onboardingTime = events.find((e: any) => e.event === 'onboarding_completed')?.created_at
    const checkinTime = events.find(
      (e: any) => e.event === 'checkin_completed_morning' || e.event === 'checkin_completed_night',
    )?.created_at

    if (onboardingTime && checkinTime) {
      const diff = new Date(checkinTime).getTime() - new Date(onboardingTime).getTime()
      const hours48 = 48 * 60 * 60 * 1000
      if (diff <= hours48) {
        // Mark activated
        await supabase
          .from('users')
          .update({ activated_at: new Date().toISOString() })
          .eq('id', userId)

        return { activated: true, alreadyActivated: false }
      }
    }
  }

  return { activated: false, alreadyActivated: false }
}

/**
 * Onboarding step events for friction audit.
 */
export const ONBOARDING_STEP_EVENTS: Record<number, AnalyticsEvent> = {
  1: 'onboarding_step_completed',
  2: 'onboarding_step_completed',
  3: 'onboarding_step_completed',
  4: 'onboarding_step_completed',
  5: 'onboarding_step_completed',
}
