// ============================================================
// VOLT Sleep — Native Platform Detection & Utilities
// ============================================================
// Capacitor bridge: detects platform, handles back button,
// manages native-specific behavior.
// ============================================================

import { Capacitor } from '@capacitor/core'

export type Platform = 'ios' | 'android' | 'web'

/**
 * Get the current platform.
 */
export function getPlatform(): Platform {
  if (!Capacitor.isNativePlatform()) return 'web'
  return Capacitor.getPlatform() as 'ios' | 'android'
}

/**
 * Check if running as a native app.
 */
export function isNative(): boolean {
  return Capacitor.isNativePlatform()
}

/**
 * Check if running on iOS.
 */
export function isIOS(): boolean {
  return Capacitor.getPlatform() === 'ios'
}

/**
 * Check if running on Android.
 */
export function isAndroid(): boolean {
  return Capacitor.getPlatform() === 'android'
}

/**
 * Check if the app should use in-app purchases instead of Stripe.
 * Apple requires IAP for digital subscriptions on iOS.
 * Google Play requires Play Billing on Android.
 * Web uses Stripe directly.
 */
export function shouldUseIAP(): boolean {
  return isNative()
}

/**
 * Get the store type for the current platform.
 */
export function getStoreType(): 'app_store' | 'play_store' | 'stripe' {
  if (isIOS()) return 'app_store'
  if (isAndroid()) return 'play_store'
  return 'stripe'
}

/**
 * Safe area insets for iOS notch handling.
 * Returns CSS env() values for safe area.
 */
export function getSafeAreaInsets(): {
  top: string
  bottom: string
  left: string
  right: string
} {
  return {
    top: 'env(safe-area-inset-top, 0px)',
    bottom: 'env(safe-area-inset-bottom, 0px)',
    left: 'env(safe-area-inset-left, 0px)',
    right: 'env(safe-area-inset-right, 0px)',
  }
}
