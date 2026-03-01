// ============================================================
// VOLT Sleep — Android Back Button Handler
// ============================================================
// Prevents accidental app exit. Handles navigation stack.
// ============================================================

import { isAndroid } from './platform'

/**
 * Initialize Android hardware back button handler.
 * - If on a sub-page, navigate back.
 * - If on dashboard (root), show exit confirmation or minimize.
 */
export async function initBackButtonHandler(
  getCurrentRoute: () => string,
  navigateBack: () => void,
): Promise<void> {
  if (!isAndroid()) return

  try {
    const { App } = await import('@capacitor/app')

    App.addListener('backButton', ({ canGoBack }) => {
      const route = getCurrentRoute()
      const isRoot = route === '/dashboard' || route === '/'

      if (isRoot) {
        // On root: minimize app (don't exit)
        App.minimizeApp()
      } else if (canGoBack) {
        navigateBack()
      } else {
        navigateBack()
      }
    })
  } catch (err) {
    console.warn('[BackButton] Failed to initialize handler:', err)
  }
}
