// ============================================================
// VOLT Sleep — In-App Purchases (Apple IAP + Google Play Billing)
// ============================================================
// Handles subscription purchases through native stores.
// Server-side receipt validation via /api/iap/validate.
// Syncs subscription state with Supabase.
// ============================================================

import { isNative, isIOS, isAndroid, getStoreType } from './platform'

// Product IDs — must match App Store Connect & Google Play Console
export const IAP_PRODUCTS = {
  premium_monthly: {
    ios: 'nl.voltsleep.premium.monthly',
    android: 'nl.voltsleep.premium.monthly',
  },
  premium_yearly: {
    ios: 'nl.voltsleep.premium.yearly',
    android: 'nl.voltsleep.premium.yearly',
  },
} as const

export type IAPProductId = keyof typeof IAP_PRODUCTS

export interface IAPProduct {
  id: string
  title: string
  description: string
  price: string
  currency: string
  priceMicros: number
}

export interface IAPPurchaseResult {
  success: boolean
  transactionId?: string
  receipt?: string
  error?: string
}

/**
 * Initialize the IAP store connection.
 * Call once on app start.
 */
export async function initializeIAP(): Promise<void> {
  if (!isNative()) return

  try {
    const { InAppPurchases } = await import('@capacitor-community/in-app-purchases')
    await InAppPurchases.initialize()
  } catch (err) {
    console.warn('[IAP] Failed to initialize:', err)
  }
}

/**
 * Get available products with localized pricing.
 */
export async function getProducts(): Promise<IAPProduct[]> {
  if (!isNative()) return []

  try {
    const { InAppPurchases } = await import('@capacitor-community/in-app-purchases')
    const platform = isIOS() ? 'ios' : 'android'
    const productIds = Object.values(IAP_PRODUCTS).map((p) => p[platform])

    const result = await InAppPurchases.getProducts({ productIds })

    return (result.products || []).map((p: any) => ({
      id: p.productId,
      title: p.title,
      description: p.description,
      price: p.price,
      currency: p.currency,
      priceMicros: p.priceMicros || 0,
    }))
  } catch (err) {
    console.warn('[IAP] Failed to get products:', err)
    return []
  }
}

/**
 * Purchase a subscription.
 * Returns transaction info for server-side validation.
 */
export async function purchaseSubscription(
  productKey: IAPProductId,
): Promise<IAPPurchaseResult> {
  if (!isNative()) {
    return { success: false, error: 'IAP not available on web' }
  }

  try {
    const { InAppPurchases } = await import('@capacitor-community/in-app-purchases')
    const platform = isIOS() ? 'ios' : 'android'
    const productId = IAP_PRODUCTS[productKey][platform]

    const result = await InAppPurchases.purchaseProduct({ productId })

    if (result.transactionId) {
      return {
        success: true,
        transactionId: result.transactionId,
        receipt: result.receipt,
      }
    }

    return { success: false, error: 'Purchase cancelled' }
  } catch (err: any) {
    // User cancelled purchase — not an error
    if (err?.code === 'USER_CANCELLED') {
      return { success: false, error: 'cancelled' }
    }
    console.error('[IAP] Purchase failed:', err)
    return { success: false, error: err?.message || 'Purchase failed' }
  }
}

/**
 * Restore previous purchases.
 * Required by Apple App Store Guidelines 3.1.1.
 */
export async function restorePurchases(): Promise<IAPPurchaseResult[]> {
  if (!isNative()) return []

  try {
    const { InAppPurchases } = await import('@capacitor-community/in-app-purchases')
    const result = await InAppPurchases.restorePurchases()

    return (result.purchases || []).map((p: any) => ({
      success: true,
      transactionId: p.transactionId,
      receipt: p.receipt,
    }))
  } catch (err) {
    console.warn('[IAP] Failed to restore purchases:', err)
    return []
  }
}

/**
 * Validate a purchase receipt with the server.
 * Server calls Apple/Google APIs to verify, then updates Supabase.
 */
export async function validateReceipt(
  receipt: string,
  transactionId: string,
  productId: string,
): Promise<{ valid: boolean; expiresAt?: string }> {
  try {
    const response = await fetch('/api/iap/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receipt,
        transactionId,
        productId,
        store: getStoreType(),
      }),
    })

    if (!response.ok) {
      return { valid: false }
    }

    return await response.json()
  } catch {
    return { valid: false }
  }
}

/**
 * Full purchase flow: purchase → validate → sync.
 */
export async function completePurchase(
  productKey: IAPProductId,
): Promise<{ success: boolean; error?: string }> {
  // 1. Purchase through native store
  const purchase = await purchaseSubscription(productKey)
  if (!purchase.success || !purchase.receipt || !purchase.transactionId) {
    return { success: false, error: purchase.error }
  }

  // 2. Validate receipt on server
  const platform = isIOS() ? 'ios' : 'android'
  const productId = IAP_PRODUCTS[productKey][platform]
  const validation = await validateReceipt(
    purchase.receipt,
    purchase.transactionId,
    productId,
  )

  if (!validation.valid) {
    return { success: false, error: 'Receipt validation failed' }
  }

  return { success: true }
}
