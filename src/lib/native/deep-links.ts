// ============================================================
// VOLT Sleep — Deep Linking Configuration
// ============================================================
// Handles Universal Links (iOS) and App Links (Android).
// Custom scheme: voltsleep://
// Universal: https://voltsleep.nl/app/*
// ============================================================

import { isNative } from './platform'

/**
 * Deep link route mapping.
 * Maps deep link paths to app routes.
 */
const DEEP_LINK_ROUTES: Record<string, string> = {
  '/': '/dashboard',
  '/dashboard': '/dashboard',
  '/checkin/morning': '/checkin/morning',
  '/checkin/night': '/checkin/night',
  '/settings': '/settings',
  '/progress': '/progress',
  '/paywall': '/paywall',
  '/cognitive-switch': '/cognitive-switch',
}

/**
 * Parse a deep link URL and return the app route.
 */
export function parseDeepLink(url: string): {
  route: string
  params: Record<string, string>
} {
  try {
    // Handle custom scheme: voltsleep://dashboard
    // Handle universal: https://voltsleep.nl/app/dashboard
    const parsed = new URL(url)
    let path = parsed.pathname

    // Strip /app prefix for universal links
    if (path.startsWith('/app')) {
      path = path.slice(4) || '/'
    }

    // Strip locale prefix
    const localeMatch = path.match(/^\/(en|nl|de|es|fr)(.*)/)
    if (localeMatch) {
      path = localeMatch[2] || '/'
    }

    // Match route
    const route = DEEP_LINK_ROUTES[path] || '/dashboard'

    // Extract query params (e.g., ?ref=abc123)
    const params: Record<string, string> = {}
    parsed.searchParams.forEach((value, key) => {
      params[key] = value
    })

    return { route, params }
  } catch {
    return { route: '/dashboard', params: {} }
  }
}

/**
 * Initialize deep link listener for native platforms.
 * Call once in the app root.
 */
export async function initDeepLinkListener(
  onDeepLink: (route: string, params: Record<string, string>) => void,
): Promise<void> {
  if (!isNative()) return

  try {
    const { App } = await import('@capacitor/app')

    // Handle deep links when app is already open
    App.addListener('appUrlOpen', (event) => {
      const { route, params } = parseDeepLink(event.url)
      onDeepLink(route, params)
    })
  } catch (err) {
    console.warn('[DeepLink] Failed to initialize listener:', err)
  }
}

/**
 * Apple Universal Links configuration.
 * This file must be served at: https://voltsleep.nl/.well-known/apple-app-site-association
 */
export const APPLE_APP_SITE_ASSOCIATION = {
  applinks: {
    details: [
      {
        appIDs: ['TEAM_ID.nl.voltsleep.app'],
        components: [
          { '/': '/app/*', comment: 'All app routes' },
          { '/': '/?ref=*', comment: 'Referral links' },
        ],
      },
    ],
  },
}

/**
 * Android App Links configuration.
 * This file must be served at: https://voltsleep.nl/.well-known/assetlinks.json
 */
export const ANDROID_ASSET_LINKS = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'nl.voltsleep.app',
      sha256_cert_fingerprints: [
        // Replace with actual SHA256 fingerprint from: keytool -list -v -keystore release.keystore
        'REPLACE_WITH_ACTUAL_SHA256_FINGERPRINT',
      ],
    },
  },
]
