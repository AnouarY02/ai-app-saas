// ============================================================
// VOLT Sleep — In-memory Rate Limiter (production: use Upstash)
// ============================================================
// Simple sliding-window rate limiter for API routes.
// In production, replace with Upstash Redis (@upstash/ratelimit).
// ============================================================

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  /** Max requests per window */
  limit: number
  /** Window size in seconds */
  windowSeconds: number
}

const DEFAULTS: Record<string, RateLimitConfig> = {
  api: { limit: 60, windowSeconds: 60 },       // 60 req/min general
  engine: { limit: 10, windowSeconds: 60 },     // 10 req/min for engine
  checkout: { limit: 5, windowSeconds: 60 },    // 5 req/min for checkout
  analytics: { limit: 100, windowSeconds: 60 }, // 100 req/min for events
  auth: { limit: 10, windowSeconds: 300 },      // 10 req/5min for auth
}

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
}

/**
 * Check rate limit for a given identifier.
 * @param identifier - Unique key (user_id, IP, etc.)
 * @param bucket - Rate limit bucket name
 */
export function checkRateLimit(
  identifier: string,
  bucket: keyof typeof DEFAULTS = 'api',
): RateLimitResult {
  const config = DEFAULTS[bucket] || DEFAULTS.api
  const key = `${bucket}:${identifier}`
  const now = Date.now()

  const existing = store.get(key)

  if (!existing || existing.resetAt < now) {
    // New window
    store.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 })
    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetAt: now + config.windowSeconds * 1000,
    }
  }

  existing.count++
  store.set(key, existing)

  const allowed = existing.count <= config.limit
  return {
    allowed,
    limit: config.limit,
    remaining: Math.max(0, config.limit - existing.count),
    resetAt: existing.resetAt,
  }
}

/**
 * Create a NextResponse with rate limit headers.
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
  }
}
