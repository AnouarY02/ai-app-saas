import type { AnalyticsEvent } from './types'

/**
 * Track an analytics event. In production, this sends to PostHog or a custom endpoint.
 * For MVP, we log events to console and can store in Supabase.
 */
export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>
) {
  const payload = {
    event,
    properties: properties || {},
    timestamp: new Date().toISOString(),
  }

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[VOLT Analytics]', payload)
  }

  // In production: send to PostHog or custom endpoint
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) })
}

/**
 * Server-side event tracking (for API routes).
 */
export async function trackServerEvent(
  userId: string,
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>
) {
  const payload = {
    event,
    user_id: userId,
    properties: properties || {},
    timestamp: new Date().toISOString(),
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[VOLT Analytics Server]', payload)
  }

  // Store in Supabase analytics_events table
  // const supabase = createServiceSupabase()
  // await supabase.from('analytics_events').insert(payload)
}
