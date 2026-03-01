// ============================================================
// VOLT Sleep — LLM Cost Telemetry
// ============================================================
// Tracks LLM API calls per user for cost monitoring.
// Includes per-user monthly cap and kill switch checks.
// In production, persist to Supabase for dashboarding.
// ============================================================

import { MONTHLY_TOKEN_CAP_PER_USER, COST_THRESHOLDS } from './llm-config'

interface CostEntry {
  userId: string
  model: string
  inputTokens: number
  outputTokens: number
  timestamp: number
  locale: string
  feature?: string
}

// In-memory buffer — flush to DB periodically in production
const costBuffer: CostEntry[] = []

// Per-user monthly token tracker
const userMonthlyTokens: Map<string, { tokens: number; month: string }> = new Map()

// Cost per 1M tokens (approximate, Haiku 4.5 pricing)
const COST_PER_M_INPUT = 0.80  // $0.80 per 1M input tokens
const COST_PER_M_OUTPUT = 4.00 // $4.00 per 1M output tokens

/**
 * Record an LLM API call for cost tracking.
 */
export function recordLLMCall(entry: Omit<CostEntry, 'timestamp'>): void {
  costBuffer.push({ ...entry, timestamp: Date.now() })

  // Keep only last 10,000 entries in memory
  if (costBuffer.length > 10000) {
    costBuffer.splice(0, costBuffer.length - 10000)
  }

  // Track per-user monthly tokens
  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
  const existing = userMonthlyTokens.get(entry.userId)
  const totalTokens = entry.inputTokens + entry.outputTokens

  if (existing && existing.month === currentMonth) {
    existing.tokens += totalTokens
  } else {
    userMonthlyTokens.set(entry.userId, { tokens: totalTokens, month: currentMonth })
  }

  // Evict stale entries (users from previous months)
  if (userMonthlyTokens.size > 5000) {
    for (const [key, val] of userMonthlyTokens) {
      if (val.month !== currentMonth) {
        userMonthlyTokens.delete(key)
      }
    }
  }
}

/**
 * Check if a user has exceeded their monthly token cap.
 */
export function isUserOverTokenCap(userId: string): boolean {
  const currentMonth = new Date().toISOString().slice(0, 7)
  const record = userMonthlyTokens.get(userId)
  if (!record || record.month !== currentMonth) return false
  return record.tokens >= MONTHLY_TOKEN_CAP_PER_USER
}

/**
 * Get a user's monthly token usage.
 */
export function getUserMonthlyTokens(userId: string): number {
  const currentMonth = new Date().toISOString().slice(0, 7)
  const record = userMonthlyTokens.get(userId)
  if (!record || record.month !== currentMonth) return 0
  return record.tokens
}

/**
 * Check if the system should trigger cost reduction mode.
 */
export function checkCostKillSwitch(): 'full' | 'reduced' | 'rules-only' {
  const estimate = getMonthlyCostEstimate()
  if (estimate.monthlyEstimateUSD >= COST_THRESHOLDS.monthlyKillThreshold) {
    return 'rules-only'
  }
  if (estimate.monthlyEstimateUSD >= COST_THRESHOLDS.monthlyReducedThreshold) {
    return 'reduced'
  }
  return 'full'
}

/**
 * Get cost summary for the current day.
 */
export function getDailyCostSummary(): {
  totalCalls: number
  totalInputTokens: number
  totalOutputTokens: number
  estimatedCostUSD: number
  callsByUser: Record<string, number>
  callsByFeature: Record<string, number>
} {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const cutoff = todayStart.getTime()

  const todayEntries = costBuffer.filter((e) => e.timestamp >= cutoff)

  const totalInputTokens = todayEntries.reduce((sum, e) => sum + e.inputTokens, 0)
  const totalOutputTokens = todayEntries.reduce((sum, e) => sum + e.outputTokens, 0)
  const estimatedCostUSD =
    (totalInputTokens / 1_000_000) * COST_PER_M_INPUT +
    (totalOutputTokens / 1_000_000) * COST_PER_M_OUTPUT

  const callsByUser: Record<string, number> = {}
  const callsByFeature: Record<string, number> = {}
  for (const entry of todayEntries) {
    callsByUser[entry.userId] = (callsByUser[entry.userId] || 0) + 1
    const feat = entry.feature || 'unknown'
    callsByFeature[feat] = (callsByFeature[feat] || 0) + 1
  }

  return {
    totalCalls: todayEntries.length,
    totalInputTokens,
    totalOutputTokens,
    estimatedCostUSD: Math.round(estimatedCostUSD * 10000) / 10000,
    callsByUser,
    callsByFeature,
  }
}

/**
 * Get monthly cost estimate based on daily average.
 */
export function getMonthlyCostEstimate(): {
  dailyAvgCostUSD: number
  monthlyEstimateUSD: number
  avgCallsPerDay: number
} {
  if (costBuffer.length === 0) {
    return { dailyAvgCostUSD: 0, monthlyEstimateUSD: 0, avgCallsPerDay: 0 }
  }

  const firstEntry = costBuffer[0].timestamp
  const daysSinceFirst = Math.max(1, (Date.now() - firstEntry) / (24 * 60 * 60 * 1000))

  const totalInputTokens = costBuffer.reduce((sum, e) => sum + e.inputTokens, 0)
  const totalOutputTokens = costBuffer.reduce((sum, e) => sum + e.outputTokens, 0)
  const totalCostUSD =
    (totalInputTokens / 1_000_000) * COST_PER_M_INPUT +
    (totalOutputTokens / 1_000_000) * COST_PER_M_OUTPUT

  const dailyAvg = totalCostUSD / daysSinceFirst
  return {
    dailyAvgCostUSD: Math.round(dailyAvg * 10000) / 10000,
    monthlyEstimateUSD: Math.round(dailyAvg * 30 * 100) / 100,
    avgCallsPerDay: Math.round(costBuffer.length / daysSinceFirst),
  }
}
