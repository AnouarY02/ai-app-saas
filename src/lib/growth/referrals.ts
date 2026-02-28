// ============================================================
// VOLT Sleep — Referral Loop Engine
// ============================================================
// 1 referral  = 7 days premium extension
// 3 referrals = 1 month free (30 days)
// ============================================================

export interface ReferralReward {
  totalReferrals: number
  convertedReferrals: number
  earnedDays: number
  nextMilestone: { referrals: number; reward: string } | null
}

const REWARDS = [
  { referrals: 1, days: 7, label: '7 days premium' },
  { referrals: 3, days: 30, label: '1 month free' },
  { referrals: 5, days: 30, label: '1 extra month free' },
  { referrals: 10, days: 90, label: '3 months free' },
]

/**
 * Calculate total earned premium days from referrals.
 */
export function calculateReferralReward(convertedReferrals: number): ReferralReward {
  let earnedDays = 0

  for (const reward of REWARDS) {
    if (convertedReferrals >= reward.referrals) {
      earnedDays = reward.days
    }
  }

  // Cumulative: each converted referral adds 7 days base
  earnedDays = Math.max(earnedDays, convertedReferrals * 7)

  // Find next milestone
  const nextMilestone = REWARDS.find((r) => r.referrals > convertedReferrals)

  return {
    totalReferrals: convertedReferrals,
    convertedReferrals,
    earnedDays,
    nextMilestone: nextMilestone
      ? { referrals: nextMilestone.referrals, reward: nextMilestone.label }
      : null,
  }
}

/**
 * Generate locale-aware share text.
 */
export function getShareText(locale: string, referralCode: string): {
  title: string
  text: string
  url: string
} {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://voltsleep.com'
  const url = `${baseUrl}?ref=${referralCode}`

  const texts: Record<string, { title: string; text: string }> = {
    en: {
      title: 'My energy improved with VOLT Sleep',
      text: 'I\'ve been using VOLT Sleep to optimize my energy. One daily action, backed by behavioral science. Try it free!',
    },
    nl: {
      title: 'Mijn energie is verbeterd met VOLT Sleep',
      text: 'Ik gebruik VOLT Sleep om mijn energie te optimaliseren. Eén dagelijkse actie, op basis van gedragswetenschap. Probeer het gratis!',
    },
    de: {
      title: 'Meine Energie hat sich mit VOLT Sleep verbessert',
      text: 'Ich nutze VOLT Sleep zur Optimierung meiner Energie. Eine tägliche Aktion, basierend auf Verhaltenswissenschaft. Probier es kostenlos!',
    },
    es: {
      title: 'Mi energía mejoró con VOLT Sleep',
      text: 'Uso VOLT Sleep para optimizar mi energía. Una acción diaria, basada en ciencia conductual. ¡Pruébalo gratis!',
    },
    fr: {
      title: 'Mon énergie s\'est améliorée avec VOLT Sleep',
      text: 'J\'utilise VOLT Sleep pour optimiser mon énergie. Une action quotidienne, basée sur la science comportementale. Essayez gratuitement !',
    },
  }

  const t = texts[locale] || texts.en

  return { title: t.title, text: t.text, url }
}

/**
 * Apply referral premium extension.
 * Returns new period_end date.
 */
export function calculateExtendedPeriod(
  currentPeriodEnd: string,
  earnedDays: number,
): string {
  const date = new Date(currentPeriodEnd)
  date.setDate(date.getDate() + earnedDays)
  return date.toISOString()
}
