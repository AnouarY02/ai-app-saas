// ============================================================
// VOLT Sleep — Conversion Engine
// ============================================================
// Triggers paywall at optimal moments:
// 1. After 3 completed daily cards
// 2. After first energy improvement spike
// 3. After weekly report preview
// ============================================================

export interface ConversionTrigger {
  shouldTrigger: boolean
  reason: 'card_count' | 'energy_spike' | 'weekly_preview' | 'none'
  message?: string
}

/**
 * Determine if we should show a conversion prompt.
 * Only for free users.
 */
export function checkConversionTrigger(
  completedCards: number,
  energyDelta: number,
  hasViewedWeeklyPreview: boolean,
): ConversionTrigger {
  // Trigger 1: After 3 completed daily cards
  if (completedCards >= 3 && completedCards <= 5) {
    return {
      shouldTrigger: true,
      reason: 'card_count',
      message: 'You\'ve completed 3 energy actions. Unlock AI-powered personalization.',
    }
  }

  // Trigger 2: Energy improvement spike (2+ points)
  if (energyDelta >= 2) {
    return {
      shouldTrigger: true,
      reason: 'energy_spike',
      message: 'Your energy improved! Premium adapts your plan even faster.',
    }
  }

  // Trigger 3: After viewing weekly report preview
  if (hasViewedWeeklyPreview) {
    return {
      shouldTrigger: true,
      reason: 'weekly_preview',
      message: 'Unlock your full Weekly Energy Report.',
    }
  }

  return { shouldTrigger: false, reason: 'none' }
}

/**
 * Get trial days remaining for a user.
 * Returns null if not on trial.
 */
export function getTrialDaysRemaining(
  subscription: { status: string; current_period_end: string } | null,
): number | null {
  if (!subscription || subscription.status !== 'trialing') return null

  const endDate = new Date(subscription.current_period_end)
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()
  const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))

  return days
}

/**
 * Get pricing for user's A/B test variant.
 */
export function getPricingForVariant(variant: string): {
  monthly: number
  yearly: number
  monthlyDisplay: string
  yearlyDisplay: string
  yearlyMonthly: string
  discount: number
} {
  const monthly = parseFloat(variant) || 9.99
  const yearlyMultiplier = 0.58 // ~42% discount
  const yearly = Math.round(monthly * 12 * yearlyMultiplier * 100) / 100
  const yearlyMonthly = Math.round((yearly / 12) * 100) / 100

  return {
    monthly,
    yearly,
    monthlyDisplay: `€${monthly.toFixed(2)}/month`,
    yearlyDisplay: `€${yearly.toFixed(2)}/year`,
    yearlyMonthly: `€${yearlyMonthly.toFixed(2)}/month`,
    discount: Math.round((1 - yearlyMultiplier) * 100),
  }
}
