// ============================================================
// VOLT Sleep — Energy Streak Engine
// ============================================================
// Forgiving streak logic:
// - Miss 1 day = soft reset (streak paused, not zeroed)
// - Miss 2+ days = full reset
// ============================================================

export interface StreakData {
  current: number
  longest: number
  lastActiveDate: string | null
  status: 'active' | 'at_risk' | 'broken'
}

/**
 * Calculate streak from recent actions (sorted desc by date).
 * Forgiving: 1 missed day = streak paused but not reset.
 */
export function calculateStreak(
  actions: Array<{ date: string; completed_primary: boolean }>,
): StreakData {
  if (actions.length === 0) {
    return { current: 0, longest: 0, lastActiveDate: null, status: 'broken' }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let current = 0
  let longest = 0
  let tempStreak = 0
  let missedDays = 0
  let lastActiveDate: string | null = null
  let status: 'active' | 'at_risk' | 'broken' = 'broken'

  // Sort by date descending
  const sorted = [...actions]
    .filter((a) => a.completed_primary)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sorted.length === 0) {
    return { current: 0, longest: 0, lastActiveDate: null, status: 'broken' }
  }

  lastActiveDate = sorted[0].date

  // Check if most recent completed action is today or yesterday
  const lastDate = new Date(sorted[0].date)
  lastDate.setHours(0, 0, 0, 0)
  const daysSinceLastActive = Math.floor(
    (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (daysSinceLastActive > 2) {
    // More than 2 days since last activity = broken
    return { current: 0, longest: 0, lastActiveDate, status: 'broken' }
  }

  // Walk through sorted completed actions to build streak
  tempStreak = 1
  for (let i = 1; i < sorted.length; i++) {
    const prevDate = new Date(sorted[i - 1].date)
    const currDate = new Date(sorted[i].date)
    prevDate.setHours(0, 0, 0, 0)
    currDate.setHours(0, 0, 0, 0)

    const dayDiff = Math.floor(
      (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24),
    )

    if (dayDiff === 1) {
      // Consecutive day
      tempStreak++
    } else if (dayDiff === 2) {
      // 1 missed day — forgiving, continue streak
      tempStreak++
      missedDays++
    } else {
      // 2+ missed days — break
      break
    }
  }

  current = tempStreak
  longest = Math.max(current, longest)

  // Determine status
  if (daysSinceLastActive === 0) {
    status = 'active'
  } else if (daysSinceLastActive === 1) {
    status = 'at_risk'
  } else {
    status = 'at_risk' // 2 days = at risk (forgiving window)
  }

  return { current, longest, lastActiveDate, status }
}

/**
 * Detect micro wins: energy improved by 2+ points compared to baseline.
 */
export function detectMicroWin(
  recentLogs: Array<{ energy_morning: number | null; date: string }>,
): { improved: boolean; delta: number } {
  const energyValues = recentLogs
    .filter((l) => l.energy_morning !== null)
    .map((l) => ({ energy: l.energy_morning!, date: l.date }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (energyValues.length < 3) {
    return { improved: false, delta: 0 }
  }

  // Compare last 3 days average vs previous 3 days average
  const recent = energyValues.slice(-3)
  const earlier = energyValues.slice(-6, -3)

  if (earlier.length === 0) {
    return { improved: false, delta: 0 }
  }

  const recentAvg = recent.reduce((s, v) => s + v.energy, 0) / recent.length
  const earlierAvg = earlier.reduce((s, v) => s + v.energy, 0) / earlier.length
  const delta = Math.round((recentAvg - earlierAvg) * 10) / 10

  return { improved: delta >= 2, delta }
}

/**
 * Habit Momentum Score (0-100).
 * Weighted: recent days matter more.
 * Returns score and trend direction.
 */
export function calculateMomentum(
  actions: Array<{ date: string; completed_primary: boolean }>,
): { score: number; trend: 'up' | 'down' | 'stable' } {
  if (actions.length === 0) {
    return { score: 0, trend: 'stable' }
  }

  // Last 14 days
  const now = new Date()
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

  const recent = actions.filter((a) => new Date(a.date) >= twoWeeksAgo)
  if (recent.length === 0) {
    return { score: 0, trend: 'down' }
  }

  // Weighted score: more recent = higher weight
  let weightedCompleted = 0
  let totalWeight = 0

  recent.forEach((a) => {
    const daysAgo = Math.floor(
      (now.getTime() - new Date(a.date).getTime()) / (1000 * 60 * 60 * 24),
    )
    const weight = Math.max(1, 14 - daysAgo) // 14 for today, 1 for 13 days ago
    totalWeight += weight
    if (a.completed_primary) {
      weightedCompleted += weight
    }
  })

  const score = totalWeight > 0 ? Math.round((weightedCompleted / totalWeight) * 100) : 0

  // Trend: compare last 7 days vs previous 7 days
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const lastWeek = recent.filter((a) => new Date(a.date) >= oneWeekAgo)
  const prevWeek = recent.filter(
    (a) => new Date(a.date) < oneWeekAgo && new Date(a.date) >= twoWeeksAgo,
  )

  const lastWeekRate =
    lastWeek.length > 0
      ? lastWeek.filter((a) => a.completed_primary).length / lastWeek.length
      : 0
  const prevWeekRate =
    prevWeek.length > 0
      ? prevWeek.filter((a) => a.completed_primary).length / prevWeek.length
      : 0

  let trend: 'up' | 'down' | 'stable' = 'stable'
  if (lastWeekRate - prevWeekRate > 0.1) trend = 'up'
  else if (prevWeekRate - lastWeekRate > 0.1) trend = 'down'

  return { score, trend }
}
