// ============================================================
// VOLT Sleep — i18n Core: Translation Loading & Utilities
// ============================================================

import { type Locale, defaultLocale, isValidLocale } from './config'

type NestedMessages = { [key: string]: string | NestedMessages }

// Cache loaded translations in-memory (per server process)
const cache = new Map<Locale, NestedMessages>()

/**
 * Load translations for a locale. Cached after first load.
 */
export async function getMessages(locale: Locale): Promise<NestedMessages> {
  if (cache.has(locale)) return cache.get(locale)!

  try {
    const messages = (await import(`../../../locales/${locale}.json`)).default
    cache.set(locale, messages)
    return messages
  } catch {
    // Fallback to default locale
    if (locale !== defaultLocale) {
      return getMessages(defaultLocale)
    }
    return {}
  }
}

/**
 * Get a nested translation value by dot-notation key.
 * Example: t(messages, 'landing.hero.headline')
 */
export function t(messages: NestedMessages, key: string, params?: Record<string, string | number>): string {
  const parts = key.split('.')
  let current: string | NestedMessages = messages

  for (const part of parts) {
    if (typeof current !== 'object' || current === null) return key
    current = (current as NestedMessages)[part]
  }

  if (typeof current !== 'string') return key

  // Replace {{param}} placeholders
  if (params) {
    let result = current
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v))
    }
    return result
  }

  return current
}

/**
 * Detect locale from various sources with priority:
 * 1. User preference (from DB, passed as param)
 * 2. Cookie
 * 3. Accept-Language header
 * 4. Fallback: defaultLocale
 */
export function detectLocale(options: {
  userPreference?: string | null
  cookie?: string | null
  acceptLanguage?: string | null
}): Locale {
  // 1. User preference (DB)
  if (options.userPreference && isValidLocale(options.userPreference)) {
    return options.userPreference
  }

  // 2. Cookie
  if (options.cookie && isValidLocale(options.cookie)) {
    return options.cookie
  }

  // 3. Accept-Language header
  if (options.acceptLanguage) {
    const parsed = parseAcceptLanguage(options.acceptLanguage)
    for (const lang of parsed) {
      if (isValidLocale(lang)) return lang
      // Try base language (e.g., 'en-US' → 'en')
      const base = lang.split('-')[0]
      if (isValidLocale(base)) return base
    }
  }

  // 4. Fallback
  return defaultLocale
}

/** Parse Accept-Language header into sorted array of language codes */
function parseAcceptLanguage(header: string): string[] {
  return header
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=')
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
    .map((item) => item.lang)
}

export { type Locale, defaultLocale, locales, isValidLocale } from './config'
