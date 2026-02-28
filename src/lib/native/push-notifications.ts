// ============================================================
// VOLT Sleep — Push Notification Service
// ============================================================
// Handles native push (APNs/FCM) + web fallback.
// Permission request, token registration, scheduling.
// ============================================================

import { isNative } from './platform'

export interface PushNotificationPayload {
  title: string
  body: string
  data?: Record<string, string>
  schedule?: { at: Date }
}

/**
 * Request push notification permission.
 * Returns 'granted' | 'denied' | 'default'.
 */
export async function requestPushPermission(): Promise<NotificationPermission> {
  if (isNative()) {
    try {
      const { PushNotifications } = await import('@capacitor/push-notifications')
      const result = await PushNotifications.requestPermissions()
      if (result.receive === 'granted') {
        await PushNotifications.register()
        return 'granted'
      }
      return 'denied'
    } catch {
      return 'denied'
    }
  }

  // Web fallback
  if (typeof window !== 'undefined' && 'Notification' in window) {
    const result = await Notification.requestPermission()
    return result
  }

  return 'denied'
}

/**
 * Get the push token for server registration.
 * Returns null if not available.
 */
export async function getPushToken(): Promise<string | null> {
  if (!isNative()) return null

  try {
    const { PushNotifications } = await import('@capacitor/push-notifications')
    return new Promise((resolve) => {
      PushNotifications.addListener('registration', (token) => {
        resolve(token.value)
      })
      PushNotifications.addListener('registrationError', () => {
        resolve(null)
      })
      // Token is emitted after register() — already called in requestPushPermission
      // Set a timeout in case the event never fires
      setTimeout(() => resolve(null), 5000)
    })
  } catch {
    return null
  }
}

/**
 * Schedule a local notification (for morning/evening check-in reminders).
 */
export async function scheduleLocalNotification(
  notification: PushNotificationPayload,
): Promise<void> {
  if (isNative()) {
    try {
      const { LocalNotifications } = await import('@capacitor/local-notifications')
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Math.random() * 100000),
            title: notification.title,
            body: notification.body,
            extra: notification.data,
            schedule: notification.schedule
              ? { at: notification.schedule.at, allowWhileIdle: true }
              : undefined,
          },
        ],
      })
    } catch (err) {
      console.warn('[Push] Failed to schedule local notification:', err)
    }
    return
  }

  // Web: basic notification API (no scheduling)
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(notification.title, { body: notification.body })
  }
}

/**
 * Schedule daily check-in reminders.
 * Morning: 15 min after user's target wake time.
 * Evening: 21:30 (or user-configured bedtime - 30 min).
 */
export async function scheduleDailyReminders(
  morningTime: string, // HH:MM format
  eveningTime: string, // HH:MM format
  locale: string,
): Promise<void> {
  const messages = getReminderMessages(locale)

  const [mH, mM] = morningTime.split(':').map(Number)
  const [eH, eM] = eveningTime.split(':').map(Number)

  const morningDate = getNextOccurrence(mH, mM)
  const eveningDate = getNextOccurrence(eH, eM)

  await scheduleLocalNotification({
    title: messages.morning.title,
    body: messages.morning.body,
    data: { route: '/checkin/morning' },
    schedule: { at: morningDate },
  })

  await scheduleLocalNotification({
    title: messages.evening.title,
    body: messages.evening.body,
    data: { route: '/checkin/night' },
    schedule: { at: eveningDate },
  })
}

function getNextOccurrence(hours: number, minutes: number): Date {
  const now = new Date()
  const target = new Date()
  target.setHours(hours, minutes, 0, 0)

  // If the time has already passed today, schedule for tomorrow
  if (target <= now) {
    target.setDate(target.getDate() + 1)
  }

  return target
}

function getReminderMessages(locale: string): {
  morning: { title: string; body: string }
  evening: { title: string; body: string }
} {
  const messages: Record<string, { morning: { title: string; body: string }; evening: { title: string; body: string } }> = {
    en: {
      morning: { title: 'Good morning', body: 'Your Daily Energy Card is ready. 45 seconds to better energy.' },
      evening: { title: 'Evening check-in', body: 'Quick check-in before bed. Helps tomorrow\'s advice.' },
    },
    nl: {
      morning: { title: 'Goedemorgen', body: 'Je Energy Card staat klaar. 45 seconden voor betere energie.' },
      evening: { title: 'Avond check-in', body: 'Snelle check-in voor het slapen. Helpt het advies van morgen.' },
    },
    de: {
      morning: { title: 'Guten Morgen', body: 'Deine Energy Card ist bereit. 45 Sekunden zu besserer Energie.' },
      evening: { title: 'Abend-Check-in', body: 'Kurzer Check-in vor dem Schlafen. Verbessert den Rat von morgen.' },
    },
    es: {
      morning: { title: 'Buenos dias', body: 'Tu Tarjeta de Energia esta lista. 45 segundos para mejor energia.' },
      evening: { title: 'Check-in nocturno', body: 'Check-in rapido antes de dormir. Mejora el consejo de manana.' },
    },
    fr: {
      morning: { title: 'Bonjour', body: 'Votre Carte Energie est prete. 45 secondes pour une meilleure energie.' },
      evening: { title: 'Check-in du soir', body: 'Check-in rapide avant de dormir. Ameliore les conseils de demain.' },
    },
  }

  return messages[locale] || messages.en
}
