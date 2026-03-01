// ============================================================
// VOLT Sleep — Response Cache (in-memory, per-process)
// ============================================================
// Caches Daily Energy Card responses to avoid redundant LLM calls.
// In production, upgrade to Redis/Upstash for shared cache.
// ============================================================

interface CacheEntry<T> {
  data: T
  expiresAt: number
  hash: string
}

const store = new Map<string, CacheEntry<unknown>>()

// Clean expired entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.expiresAt < now) store.delete(key)
  }
}, 10 * 60 * 1000)

/**
 * Simple hash of inputs to detect when data has changed.
 */
function hashInputs(...parts: unknown[]): string {
  return parts
    .map((p) => (typeof p === 'string' ? p : JSON.stringify(p)))
    .join('|')
    .slice(0, 500)
}

/**
 * Get a cached value if it exists and inputs haven't changed.
 */
export function getCached<T>(
  key: string,
  inputHash: string,
): T | null {
  const entry = store.get(key)
  if (!entry) return null
  if (entry.expiresAt < Date.now()) {
    store.delete(key)
    return null
  }
  // Only return if inputs haven't changed
  if (entry.hash !== inputHash) return null
  return entry.data as T
}

/**
 * Set a cached value with TTL.
 */
export function setCache<T>(
  key: string,
  data: T,
  inputHash: string,
  ttlMs: number = 12 * 60 * 60 * 1000, // 12 hours default
): void {
  store.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
    hash: inputHash,
  })
}

/**
 * Create a deterministic hash for cache invalidation.
 * Used for Daily Card: if profile/logs change, cache is invalidated.
 */
export function createInputHash(
  userId: string,
  date: string,
  ...extraParts: unknown[]
): string {
  return hashInputs(userId, date, ...extraParts)
}

/**
 * Get current cache stats (for monitoring).
 */
export function getCacheStats(): { entries: number; keys: string[] } {
  return {
    entries: store.size,
    keys: Array.from(store.keys()),
  }
}
