import type { AnalyticsEvent } from './types'

/**
 * Client-side: fire-and-forget POST to /api/analytics.
 * Safe to call from any 'use client' component.
 */
export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return

  const payload = { event, properties: properties || {} }

  if (process.env.NODE_ENV === 'development') {
    console.log('[VOLT Analytics]', payload)
  }

  // Non-blocking POST — we don't await this
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Silently ignore analytics failures — never block UX
  })
}

/**
 * Server-side: store event directly via Supabase service client.
 * Used inside API routes where we already have a supabase instance.
 */
export async function trackServerEvent(
  userId: string,
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>
) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[VOLT Analytics Server]', { event, userId })
  }

  try {
    // Lazy import to avoid circular dependency
    const { createServiceSupabase } = await import('./supabase/server')
    const supabase = createServiceSupabase()
    await supabase.from('analytics_events').insert({
      user_id: userId,
      event,
      properties: properties || {},
    })
  } catch {
    // Silently ignore — analytics must never break core flow
  }
}
