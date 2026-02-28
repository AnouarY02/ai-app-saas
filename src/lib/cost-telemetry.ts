// ============================================================
// VOLT Sleep — LLM Cost Telemetry
// ============================================================
// Tracks LLM API calls per user for cost monitoring.
// In production, persist to Supabase for dashboarding.
// ============================================================

interface CostEntry {
  userId: string
  model: string
  inputTokens: number
  outputTokens: number
  timestamp: number
  locale: string
}

// In-memory buffer — flush to DB periodically in production
const costBuffer: CostEntry[] = []

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
  for (const entry of todayEntries) {
    callsByUser[entry.userId] = (callsByUser[entry.userId] || 0) + 1
  }

  return {
    totalCalls: todayEntries.length,
    totalInputTokens,
    totalOutputTokens,
    estimatedCostUSD: Math.round(estimatedCostUSD * 10000) / 10000,
    callsByUser,
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
