// ============================================================
// VOLT Sleep — GDPR Consent Management
// ============================================================
// Cookie consent banner logic + consent state persistence.
// EU ePrivacy Directive + GDPR Article 6/7 compliant.
// ============================================================

export interface ConsentState {
  necessary: true // Always required — cannot be disabled
  analytics: boolean
  marketing: boolean
  timestamp: string
  version: string
}

const CONSENT_COOKIE = 'volt-consent'
const CONSENT_VERSION = '1.0'

/**
 * Get current consent state from cookie.
 * Returns null if consent has not been given.
 */
export function getConsentState(): ConsentState | null {
  if (typeof document === 'undefined') return null

  const cookie = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))

  if (!cookie) return null

  try {
    const state = JSON.parse(decodeURIComponent(cookie.split('=')[1]))
    // Check version — if outdated, re-request consent
    if (state.version !== CONSENT_VERSION) return null
    return state as ConsentState
  } catch {
    return null
  }
}

/**
 * Save consent state to cookie.
 * Cookie expires in 365 days (GDPR recommends re-consent annually).
 */
export function saveConsentState(analytics: boolean, marketing: boolean): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics,
    marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  }

  const maxAge = 365 * 24 * 60 * 60 // 1 year
  const value = encodeURIComponent(JSON.stringify(state))
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`

  return state
}

/**
 * Accept all consent categories.
 */
export function acceptAllConsent(): ConsentState {
  return saveConsentState(true, true)
}

/**
 * Accept only necessary cookies (reject analytics + marketing).
 */
export function rejectOptionalConsent(): ConsentState {
  return saveConsentState(false, false)
}

/**
 * Check if analytics tracking is allowed.
 */
export function isAnalyticsAllowed(): boolean {
  const state = getConsentState()
  return state?.analytics ?? false
}

/**
 * Check if marketing pixels are allowed.
 */
export function isMarketingAllowed(): boolean {
  const state = getConsentState()
  return state?.marketing ?? false
}

/**
 * Check if consent banner should be shown.
 */
export function shouldShowConsentBanner(): boolean {
  return getConsentState() === null
}

/**
 * Withdraw consent — reset to necessary only.
 */
export function withdrawConsent(): ConsentState {
  return saveConsentState(false, false)
}
