// ============================================================
// VOLT Sleep — In-App Review Prompt
// ============================================================
// Triggers App Store / Play Store review prompt after 5
// successful check-ins. Follows Apple/Google guidelines.
// ============================================================

import { isNative } from './platform'

const REVIEW_STORAGE_KEY = 'volt-review-prompted'
const CHECKIN_COUNT_KEY = 'volt-checkin-count'
const REVIEW_THRESHOLD = 5

/**
 * Record a completed check-in and check if review should be prompted.
 * Returns true if this is the right moment to show the review prompt.
 */
export async function recordCheckinAndCheckReview(): Promise<boolean> {
  const alreadyPrompted = await getStoredValue(REVIEW_STORAGE_KEY)
  if (alreadyPrompted === 'true') return false

  const currentCount = parseInt(await getStoredValue(CHECKIN_COUNT_KEY) || '0', 10)
  const newCount = currentCount + 1
  await setStoredValue(CHECKIN_COUNT_KEY, String(newCount))

  return newCount === REVIEW_THRESHOLD
}

/**
 * Show the native in-app review dialog.
 * iOS: SKStoreReviewController
 * Android: Google Play In-App Review API
 *
 * Note: Both platforms may choose not to show the dialog
 * even when requested (rate limiting by OS).
 */
export async function requestAppReview(): Promise<void> {
  if (!isNative()) return

  try {
    const { RateApp } = await import('capacitor-rate-app')
    await RateApp.requestReview()

    // Mark as prompted (even if OS didn't show it)
    await setStoredValue(REVIEW_STORAGE_KEY, 'true')
  } catch (err) {
    console.warn('[Review] Failed to request review:', err)
  }
}

// --- Storage helpers ---

async function getStoredValue(key: string): Promise<string | null> {
  if (isNative()) {
    try {
      const { Preferences } = await import('@capacitor/preferences')
      const result = await Preferences.get({ key })
      return result.value
    } catch {
      // Fall through
    }
  }

  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key)
  }
  return null
}

async function setStoredValue(key: string, value: string): Promise<void> {
  if (isNative()) {
    try {
      const { Preferences } = await import('@capacitor/preferences')
      await Preferences.set({ key, value })
      return
    } catch {
      // Fall through
    }
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value)
  }
}
