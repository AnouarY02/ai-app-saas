// ============================================================
// VOLT Sleep — Health Data Integration
// ============================================================
// Read-only access to sleep duration from Apple Health / Google Fit.
// No medical claims. Data used only for energy card personalization.
// Opt-in only. Graceful fallback if denied.
// ============================================================

import { isNative, isIOS, isAndroid } from '../native/platform'

export interface SleepData {
  date: string // YYYY-MM-DD
  durationMinutes: number
  bedtime: string | null // HH:MM
  wakeTime: string | null // HH:MM
  source: 'apple_health' | 'google_fit' | 'manual'
}

export interface HealthPermissionStatus {
  granted: boolean
  canRequest: boolean
}

/**
 * Check if health integration is available on this platform.
 */
export function isHealthAvailable(): boolean {
  return isNative()
}

/**
 * Request health data permissions.
 * iOS: Apple HealthKit (sleep analysis, read-only)
 * Android: Google Fit (sleep sessions, read-only)
 */
export async function requestHealthPermission(): Promise<HealthPermissionStatus> {
  if (!isNative()) {
    return { granted: false, canRequest: false }
  }

  try {
    if (isIOS()) {
      return await requestAppleHealthPermission()
    }
    if (isAndroid()) {
      return await requestGoogleFitPermission()
    }
  } catch (err) {
    console.warn('[Health] Permission request failed:', err)
  }

  return { granted: false, canRequest: true }
}

/**
 * Get sleep data for the last N days.
 * Returns empty array if not available or not permitted.
 */
export async function getSleepData(days: number = 7): Promise<SleepData[]> {
  if (!isNative()) return []

  try {
    if (isIOS()) {
      return await getAppleHealthSleepData(days)
    }
    if (isAndroid()) {
      return await getGoogleFitSleepData(days)
    }
  } catch (err) {
    console.warn('[Health] Failed to read sleep data:', err)
  }

  return []
}

/**
 * Get last night's sleep duration.
 * Returns null if not available.
 */
export async function getLastNightSleep(): Promise<SleepData | null> {
  const data = await getSleepData(1)
  return data.length > 0 ? data[0] : null
}

// --- Apple HealthKit ---

async function requestAppleHealthPermission(): Promise<HealthPermissionStatus> {
  try {
    const { CapacitorHealthkit } = await import('@nicoriera/capacitor-healthkit')

    const result = await CapacitorHealthkit.requestAuthorization({
      read: ['sleepAnalysis'],
      write: [], // Read-only — we never write health data
    })

    return { granted: result.granted, canRequest: true }
  } catch {
    return { granted: false, canRequest: true }
  }
}

async function getAppleHealthSleepData(days: number): Promise<SleepData[]> {
  try {
    const { CapacitorHealthkit } = await import('@nicoriera/capacitor-healthkit')

    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const result = await CapacitorHealthkit.queryHKitSampleType({
      sampleName: 'sleepAnalysis',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: days * 3, // Multiple entries per night possible
    })

    return parseSleepSamples(result.resultData || [], 'apple_health')
  } catch {
    return []
  }
}

// --- Google Fit ---

async function requestGoogleFitPermission(): Promise<HealthPermissionStatus> {
  try {
    const { GoogleFit } = await import('@nicoriera/capacitor-google-fit')

    await GoogleFit.connectToGoogleFit()
    return { granted: true, canRequest: true }
  } catch {
    return { granted: false, canRequest: true }
  }
}

async function getGoogleFitSleepData(days: number): Promise<SleepData[]> {
  try {
    const { GoogleFit } = await import('@nicoriera/capacitor-google-fit')

    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const result = await GoogleFit.getSleepData({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    })

    return parseSleepSessions(result.sessions || [], 'google_fit')
  } catch {
    return []
  }
}

// --- Data parsers ---

function parseSleepSamples(
  samples: any[],
  source: 'apple_health' | 'google_fit',
): SleepData[] {
  const byDate = new Map<string, { start: Date; end: Date; totalMinutes: number }>()

  for (const sample of samples) {
    const start = new Date(sample.startDate)
    const end = new Date(sample.endDate)
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60)

    // Use the end date as the "night" date
    const dateKey = end.toISOString().split('T')[0]

    const existing = byDate.get(dateKey)
    if (existing) {
      existing.totalMinutes += durationMinutes
      if (start < existing.start) existing.start = start
      if (end > existing.end) existing.end = end
    } else {
      byDate.set(dateKey, { start, end, totalMinutes: durationMinutes })
    }
  }

  return Array.from(byDate.entries()).map(([date, data]) => ({
    date,
    durationMinutes: Math.round(data.totalMinutes),
    bedtime: formatTime(data.start),
    wakeTime: formatTime(data.end),
    source,
  }))
}

function parseSleepSessions(
  sessions: any[],
  source: 'apple_health' | 'google_fit',
): SleepData[] {
  return sessions.map((session) => {
    const start = new Date(session.startTime)
    const end = new Date(session.endTime)
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60)

    return {
      date: end.toISOString().split('T')[0],
      durationMinutes: Math.round(durationMinutes),
      bedtime: formatTime(start),
      wakeTime: formatTime(end),
      source,
    }
  })
}

function formatTime(date: Date): string {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}
