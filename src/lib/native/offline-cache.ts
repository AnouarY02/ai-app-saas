// ============================================================
// VOLT Sleep — Offline Cache for Daily Energy Card
// ============================================================
// Caches the latest daily card in localStorage/Preferences
// so users can view it even without connectivity.
// ============================================================

import { isNative } from './platform'

const CACHE_KEY = 'volt-daily-card-cache'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

interface CachedCard {
  data: any
  cachedAt: number
  date: string // YYYY-MM-DD
}

/**
 * Cache a daily card for offline access.
 */
export async function cacheDailyCard(cardData: any, date: string): Promise<void> {
  const entry: CachedCard = {
    data: cardData,
    cachedAt: Date.now(),
    date,
  }

  if (isNative()) {
    try {
      const { Preferences } = await import('@capacitor/preferences')
      await Preferences.set({ key: CACHE_KEY, value: JSON.stringify(entry) })
      return
    } catch {
      // Fall through to localStorage
    }
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  }
}

/**
 * Get cached daily card.
 * Returns null if no cache or cache is expired.
 */
export async function getCachedDailyCard(): Promise<{ data: any; date: string } | null> {
  let raw: string | null = null

  if (isNative()) {
    try {
      const { Preferences } = await import('@capacitor/preferences')
      const result = await Preferences.get({ key: CACHE_KEY })
      raw = result.value
    } catch {
      // Fall through to localStorage
    }
  }

  if (!raw && typeof localStorage !== 'undefined') {
    raw = localStorage.getItem(CACHE_KEY)
  }

  if (!raw) return null

  try {
    const entry: CachedCard = JSON.parse(raw)

    // Check TTL
    if (Date.now() - entry.cachedAt > CACHE_TTL) {
      return null
    }

    return { data: entry.data, date: entry.date }
  } catch {
    return null
  }
}

/**
 * Clear the daily card cache.
 */
export async function clearDailyCardCache(): Promise<void> {
  if (isNative()) {
    try {
      const { Preferences } = await import('@capacitor/preferences')
      await Preferences.remove({ key: CACHE_KEY })
    } catch {
      // Fall through
    }
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(CACHE_KEY)
  }
}
