// ============================================================
// VOLT Sleep — Security: CSP Headers, Abuse Detection, Bot Protection
// ============================================================

import { NextResponse, type NextRequest } from 'next/server'

// ============================================================
// CSP & Security Headers
// ============================================================

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://api.anthropic.com https://api.stripe.com https://*.supabase.co",
  "frame-src https://js.stripe.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ')

/**
 * Apply security headers to a response.
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('Content-Security-Policy', CSP_DIRECTIVES)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  return response
}

// ============================================================
// Abuse Detection — track failed LLM validations per IP
// ============================================================

interface AbuseEntry {
  count: number
  resetAt: number
}

const abuseStore = new Map<string, AbuseEntry>()

// Clean stale entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of abuseStore) {
    if (entry.resetAt < now) abuseStore.delete(key)
  }
}, 10 * 60 * 1000)

const ABUSE_THRESHOLD = 100     // Block after 100 failures
const ABUSE_WINDOW_MS = 60 * 60 * 1000 // 1 hour window

/**
 * Record a failed validation attempt.
 * Returns true if the IP should be blocked.
 */
export function recordAbuseAttempt(ip: string): boolean {
  const now = Date.now()
  const existing = abuseStore.get(ip)

  if (!existing || existing.resetAt < now) {
    abuseStore.set(ip, { count: 1, resetAt: now + ABUSE_WINDOW_MS })
    return false
  }

  existing.count++
  abuseStore.set(ip, existing)

  return existing.count >= ABUSE_THRESHOLD
}

/**
 * Check if an IP is currently blocked.
 */
export function isIPBlocked(ip: string): boolean {
  const entry = abuseStore.get(ip)
  if (!entry || entry.resetAt < Date.now()) return false
  return entry.count >= ABUSE_THRESHOLD
}

// ============================================================
// Bot Protection — basic signals for checkout endpoint
// ============================================================

/**
 * Simple bot detection based on request headers.
 * Not a replacement for Cloudflare/reCAPTCHA, but catches obvious bots.
 */
export function detectBot(request: NextRequest): boolean {
  const ua = request.headers.get('user-agent') || ''

  // No user agent = suspicious
  if (!ua || ua.length < 10) return true

  // Known bot patterns
  const botPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python-requests/i,
    /httpie/i,
    /postman/i,
  ]

  if (botPatterns.some((p) => p.test(ua))) return true

  // Missing accept header = suspicious for checkout
  const accept = request.headers.get('accept')
  if (!accept) return true

  return false
}
