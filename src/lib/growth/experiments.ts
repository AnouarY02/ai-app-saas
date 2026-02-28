// ============================================================
// VOLT Sleep — Lightweight A/B Test Framework
// ============================================================
// No external deps. Deterministic bucket assignment via hash.
// ============================================================

export interface Experiment {
  id: string
  variants: string[]
  // Weight per variant (must sum to 1.0)
  weights?: number[]
}

export const EXPERIMENTS: Record<string, Experiment> = {
  pricing_test: {
    id: 'pricing_test',
    variants: ['9.99', '12.99'],
    weights: [0.5, 0.5],
  },
}

/**
 * Deterministic variant assignment based on userId + experimentId.
 * Same user always gets same variant (no randomness).
 */
export function assignVariant(userId: string, experimentId: string): string {
  const experiment = EXPERIMENTS[experimentId]
  if (!experiment) return 'control'

  const hash = simpleHash(`${userId}:${experimentId}`)
  const bucket = (hash % 1000) / 1000 // 0.000 - 0.999

  const weights = experiment.weights || experiment.variants.map(() => 1 / experiment.variants.length)
  let cumulative = 0
  for (let i = 0; i < experiment.variants.length; i++) {
    cumulative += weights[i]
    if (bucket < cumulative) {
      return experiment.variants[i]
    }
  }

  return experiment.variants[experiment.variants.length - 1]
}

/**
 * Get user's experiment assignments (all active experiments).
 */
export function getUserExperiments(userId: string): Record<string, string> {
  const assignments: Record<string, string> = {}
  for (const [id] of Object.entries(EXPERIMENTS)) {
    assignments[id] = assignVariant(userId, id)
  }
  return assignments
}

/**
 * Simple non-crypto hash for deterministic bucketing.
 */
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}
