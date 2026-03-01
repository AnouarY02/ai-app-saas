// ============================================================
// VOLT Sleep — Calendar Integration
// ============================================================
// Creates bedtime reminder and morning light events.
// Supports Google Calendar (API) and Apple Calendar (native).
// Web: .ics download fallback.
// ============================================================

import { isNative, isIOS } from '../native/platform'

export interface CalendarEvent {
  title: string
  description: string
  startTime: string // ISO 8601
  endTime: string // ISO 8601
  recurrence?: string // RRULE format
  reminders?: { minutes: number }[]
}

/**
 * Create a bedtime reminder event.
 */
export function createBedtimeEvent(
  bedtime: string, // HH:MM format
  locale: string,
): CalendarEvent {
  const [hours, minutes] = bedtime.split(':').map(Number)
  const reminderMinutes = 30 // Remind 30 min before bedtime

  const start = new Date()
  start.setHours(hours, minutes, 0, 0)

  const end = new Date(start)
  end.setMinutes(end.getMinutes() + 15)

  const texts = getBedtimeTexts(locale)

  return {
    title: texts.title,
    description: texts.description,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
    recurrence: 'RRULE:FREQ=DAILY',
    reminders: [{ minutes: reminderMinutes }],
  }
}

/**
 * Create a morning light reminder event.
 */
export function createMorningLightEvent(
  wakeTime: string, // HH:MM format
  locale: string,
): CalendarEvent {
  const [hours, minutes] = wakeTime.split(':').map(Number)

  const start = new Date()
  start.setHours(hours, minutes + 15, 0, 0) // 15 min after wake

  const end = new Date(start)
  end.setMinutes(end.getMinutes() + 15)

  const texts = getMorningLightTexts(locale)

  return {
    title: texts.title,
    description: texts.description,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
    recurrence: 'RRULE:FREQ=DAILY',
    reminders: [{ minutes: 0 }],
  }
}

/**
 * Add event to native calendar (iOS/Android).
 */
export async function addToNativeCalendar(event: CalendarEvent): Promise<boolean> {
  if (!isNative()) return false

  try {
    const { Calendar } = await import('@capacitor-community/calendar')

    // Request permission
    const permResult = await Calendar.requestPermissions()
    if (permResult.readCalendar !== 'granted' || permResult.writeCalendar !== 'granted') {
      return false
    }

    await Calendar.createEvent({
      title: event.title,
      notes: event.description,
      startDate: new Date(event.startTime).getTime(),
      endDate: new Date(event.endTime).getTime(),
    })

    return true
  } catch (err) {
    console.warn('[Calendar] Failed to add event:', err)
    return false
  }
}

/**
 * Generate Google Calendar URL for web users.
 */
export function getGoogleCalendarUrl(event: CalendarEvent): string {
  const start = new Date(event.startTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const end = new Date(event.endTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    dates: `${start}/${end}`,
    recur: event.recurrence || '',
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Generate .ics file content for download (universal fallback).
 */
export function generateICSFile(event: CalendarEvent): string {
  const formatDate = (date: string) =>
    new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VOLT Sleep//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(event.startTime)}`,
    `DTEND:${formatDate(event.endTime)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    event.recurrence ? `RRULE:${event.recurrence.replace('RRULE:', '')}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')
}

/**
 * Download .ics file (web).
 */
export function downloadICSFile(event: CalendarEvent, filename: string): void {
  const content = generateICSFile(event)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.ics`
  link.click()

  URL.revokeObjectURL(url)
}

// --- Locale-aware text helpers ---

function getBedtimeTexts(locale: string): { title: string; description: string } {
  const texts: Record<string, { title: string; description: string }> = {
    en: { title: 'VOLT: Wind down for bed', description: 'Start your wind-down routine. Put away screens, dim lights.' },
    nl: { title: 'VOLT: Tijd om af te winden', description: 'Start je avondroutine. Weg met schermen, dim het licht.' },
    de: { title: 'VOLT: Zeit zum Entspannen', description: 'Starte deine Abendroutine. Bildschirme weg, Lichter dimmen.' },
    es: { title: 'VOLT: Hora de relajarse', description: 'Empieza tu rutina nocturna. Deja las pantallas, atenua las luces.' },
    fr: { title: 'VOLT: Temps de se detendre', description: 'Commencez votre routine du soir. Rangez les ecrans, tamisez les lumieres.' },
  }
  return texts[locale] || texts.en
}

function getMorningLightTexts(locale: string): { title: string; description: string } {
  const texts: Record<string, { title: string; description: string }> = {
    en: { title: 'VOLT: Morning light exposure', description: '10-15 min of bright light. Go outside or sit by a window.' },
    nl: { title: 'VOLT: Ochtendlicht', description: '10-15 min helder licht. Ga naar buiten of zit bij een raam.' },
    de: { title: 'VOLT: Morgenlicht', description: '10-15 Min helles Licht. Geh raus oder sitz am Fenster.' },
    es: { title: 'VOLT: Luz matutina', description: '10-15 min de luz brillante. Sal afuera o sientate junto a una ventana.' },
    fr: { title: 'VOLT: Lumiere du matin', description: '10-15 min de lumiere vive. Sortez ou asseyez-vous pres d une fenetre.' },
  }
  return texts[locale] || texts.en
}
