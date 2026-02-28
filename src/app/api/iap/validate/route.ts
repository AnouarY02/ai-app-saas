import { NextResponse } from 'next/server'
import { createServerSupabase, createServiceSupabase } from '@/lib/supabase/server'
import { trackServerEvent } from '@/lib/analytics'
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit'

type Store = 'app_store' | 'play_store'

interface ValidateRequest {
  receipt: string
  transactionId: string
  productId: string
  store: Store
}

/**
 * POST /api/iap/validate
 * Server-side receipt validation for Apple IAP and Google Play Billing.
 * Validates receipt → updates subscription in Supabase → returns status.
 */
export async function POST(request: Request) {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rl = checkRateLimit(user.id, 'api')
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitHeaders(rl) },
      )
    }

    const body: ValidateRequest = await request.json()
    const { receipt, transactionId, productId, store } = body

    if (!receipt || !transactionId || !productId || !store) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let validationResult: { valid: boolean; expiresAt: string | null }

    if (store === 'app_store') {
      validationResult = await validateAppleReceipt(receipt)
    } else if (store === 'play_store') {
      validationResult = await validateGoogleReceipt(receipt, productId)
    } else {
      return NextResponse.json({ error: 'Invalid store' }, { status: 400 })
    }

    if (!validationResult.valid) {
      return NextResponse.json({ valid: false, error: 'Invalid receipt' }, { status: 400 })
    }

    // Upsert subscription in Supabase
    const serviceSupabase = createServiceSupabase()
    await serviceSupabase.from('subscriptions').upsert({
      user_id: user.id,
      stripe_customer_id: `${store}:${transactionId}`,
      stripe_subscription_id: transactionId,
      status: 'active',
      plan: 'premium',
      current_period_end: validationResult.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }, { onConflict: 'user_id' })

    // Update user plan
    await serviceSupabase.from('users').update({ plan: 'premium' }).eq('id', user.id)

    await trackServerEvent(user.id, 'subscription_started', {
      store,
      product_id: productId,
    })

    return NextResponse.json({
      valid: true,
      expiresAt: validationResult.expiresAt,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[IAP Validate] Error:', msg)
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 })
  }
}

/**
 * Validate Apple App Store receipt via Apple's verifyReceipt endpoint.
 * Uses the App Store Server API v2 in production.
 */
async function validateAppleReceipt(receipt: string): Promise<{ valid: boolean; expiresAt: string | null }> {
  const sharedSecret = process.env.APPLE_SHARED_SECRET
  if (!sharedSecret) {
    console.error('[IAP] APPLE_SHARED_SECRET not configured')
    return { valid: false, expiresAt: null }
  }

  // Use production URL first, fall back to sandbox
  const urls = [
    'https://buy.itunes.apple.com/verifyReceipt',
    'https://sandbox.itunes.apple.com/verifyReceipt',
  ]

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'receipt-data': receipt,
          password: sharedSecret,
          'exclude-old-transactions': true,
        }),
      })

      const data = await response.json()

      // Status 21007 = sandbox receipt sent to production → try sandbox
      if (data.status === 21007) continue

      if (data.status === 0) {
        // Valid receipt
        const latestInfo = data.latest_receipt_info?.[0]
        const expiresAt = latestInfo?.expires_date_ms
          ? new Date(parseInt(latestInfo.expires_date_ms)).toISOString()
          : null

        return { valid: true, expiresAt }
      }

      return { valid: false, expiresAt: null }
    } catch (err) {
      console.error('[IAP] Apple validation error:', err)
    }
  }

  return { valid: false, expiresAt: null }
}

/**
 * Validate Google Play purchase via Google Play Developer API.
 */
async function validateGoogleReceipt(
  purchaseToken: string,
  productId: string,
): Promise<{ valid: boolean; expiresAt: string | null }> {
  const packageName = 'nl.voltsleep.app'
  const serviceAccountKey = process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_KEY

  if (!serviceAccountKey) {
    console.error('[IAP] GOOGLE_PLAY_SERVICE_ACCOUNT_KEY not configured')
    return { valid: false, expiresAt: null }
  }

  try {
    // Get access token from service account
    const accessToken = await getGoogleAccessToken(serviceAccountKey)

    const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${productId}/tokens/${purchaseToken}`

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!response.ok) {
      return { valid: false, expiresAt: null }
    }

    const data = await response.json()

    // paymentState: 0 = pending, 1 = received, 2 = free trial
    const isValid = data.paymentState === 1 || data.paymentState === 2
    const expiresAt = data.expiryTimeMillis
      ? new Date(parseInt(data.expiryTimeMillis)).toISOString()
      : null

    return { valid: isValid, expiresAt }
  } catch (err) {
    console.error('[IAP] Google validation error:', err)
    return { valid: false, expiresAt: null }
  }
}

/**
 * Get Google API access token from service account credentials.
 */
async function getGoogleAccessToken(serviceAccountKeyJson: string): Promise<string> {
  const key = JSON.parse(serviceAccountKeyJson)

  // Build JWT
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const claims = Buffer.from(JSON.stringify({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url')

  // Sign with private key
  const crypto = await import('crypto')
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(`${header}.${claims}`)
  const signature = sign.sign(key.private_key, 'base64url')

  const jwt = `${header}.${claims}.${signature}`

  // Exchange JWT for access token
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  const data = await response.json()
  return data.access_token
}
