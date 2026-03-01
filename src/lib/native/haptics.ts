// ============================================================
// VOLT Sleep — Haptic Feedback Service
// ============================================================
// Provides native haptic feedback for key interactions.
// Graceful no-op on web.
// ============================================================

import { isNative } from './platform'

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'

/**
 * Trigger haptic feedback.
 */
export async function haptic(style: HapticStyle = 'light'): Promise<void> {
  if (!isNative()) return

  try {
    const { Haptics, ImpactStyle, NotificationType } = await import('@capacitor/haptics')

    switch (style) {
      case 'light':
        await Haptics.impact({ style: ImpactStyle.Light })
        break
      case 'medium':
        await Haptics.impact({ style: ImpactStyle.Medium })
        break
      case 'heavy':
        await Haptics.impact({ style: ImpactStyle.Heavy })
        break
      case 'success':
        await Haptics.notification({ type: NotificationType.Success })
        break
      case 'warning':
        await Haptics.notification({ type: NotificationType.Warning })
        break
      case 'error':
        await Haptics.notification({ type: NotificationType.Error })
        break
    }
  } catch {
    // Silently ignore — haptics should never break UX
  }
}

/**
 * Trigger haptic on check-in completion.
 */
export async function hapticCheckinComplete(): Promise<void> {
  await haptic('success')
}

/**
 * Trigger haptic on streak milestone.
 */
export async function hapticStreakMilestone(): Promise<void> {
  await haptic('heavy')
}

/**
 * Trigger haptic on button press.
 */
export async function hapticTap(): Promise<void> {
  await haptic('light')
}
