import type { AnalyticsEvent } from './types'

/**
 * Server-side: store event directly via Supabase service client.
 * Used inside API routes where we already have a supabase instance.
 * This file must NOT be imported from 'use client' components.
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
