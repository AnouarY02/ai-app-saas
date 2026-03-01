// ============================================================
// VOLT Sleep — LLM Configuration & Cost Controls
// ============================================================
// Controls LLM usage mode, token budgets, and kill switch.
// Target: >85% gross margin, LLM cost under 15% of revenue.
// ============================================================

export type LLMMode = 'full' | 'reduced' | 'rules-only'

/**
 * LLM_MODE controls how aggressively LLM is used:
 * - "full": LLM for all premium features (daily card, weekly insights, cognitive switch)
 * - "reduced": LLM only for weekly insights + cognitive switch (daily cards = rules-only)
 * - "rules-only": No LLM calls at all (kill switch engaged)
 */
export function getLLMMode(): LLMMode {
  const mode = process.env.LLM_MODE || 'full'
  if (mode === 'reduced' || mode === 'rules-only') return mode
  return 'full'
}

// --- Token Budget Controls ---

export const TOKEN_BUDGETS = {
  daily_card: {
    maxInputTokens: 500,
    maxOutputTokens: 500,
  },
  weekly_insight: {
    maxInputTokens: 1500,
    maxOutputTokens: 1500,
  },
  cognitive_switch: {
    maxInputTokens: 500,
    maxOutputTokens: 500,
  },
  energy_share: {
    maxInputTokens: 300,
    maxOutputTokens: 300,
  },
} as const

export type TokenBudgetType = keyof typeof TOKEN_BUDGETS

// --- Per-user monthly token cap ---

export const MONTHLY_TOKEN_CAP_PER_USER = 50_000 // ~$0.20/user/month at Haiku pricing

// --- Cost thresholds for kill switch ---

export const COST_THRESHOLDS = {
  /** Monthly LLM cost in USD that triggers automatic reduction to "reduced" mode */
  monthlyReducedThreshold: 500,
  /** Monthly LLM cost in USD that triggers full kill switch to "rules-only" */
  monthlyKillThreshold: 1000,
} as const

/**
 * Check if a feature should use LLM based on current mode.
 */
export function shouldUseLLM(
  feature: 'daily_card' | 'weekly_insight' | 'cognitive_switch' | 'energy_share',
  isPremium: boolean,
): boolean {
  const mode = getLLMMode()

  // rules-only: no LLM for anything
  if (mode === 'rules-only') return false

  // Non-premium users never get LLM
  if (!isPremium) return false

  // reduced: LLM only for weekly insights, cognitive switch, energy share
  if (mode === 'reduced') {
    return feature === 'weekly_insight' || feature === 'cognitive_switch' || feature === 'energy_share'
  }

  // full: LLM for all premium features
  return true
}
