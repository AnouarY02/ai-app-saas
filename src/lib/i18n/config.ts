// ============================================================
// VOLT Sleep — i18n Configuration
// ============================================================

export const defaultLocale = 'en' as const

export const locales = ['en', 'nl', 'de', 'es', 'fr'] as const
export type Locale = (typeof locales)[number]

// Tier 2: ready but content optional
export const tier2Locales = ['it', 'pt', 'ja', 'ko', 'sv'] as const
export type Tier2Locale = (typeof tier2Locales)[number]

export const allLocales = [...locales, ...tier2Locales] as const
export type AnyLocale = (typeof allLocales)[number]

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale)
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  nl: '🇳🇱',
  de: '🇩🇪',
  es: '🇪🇸',
  fr: '🇫🇷',
}

/** Metadata per locale */
export const localeMeta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'VOLT Sleep — Wake up with energy. Every day.',
    description: 'Optimize your energy through smarter sleep. Evidence-based coaching, 1 action per day.',
  },
  nl: {
    title: 'VOLT Sleep — Wakker met energie. Elke dag.',
    description: 'Optimaliseer je energie door slimmer te slapen. Evidence-based coaching, 1 actie per dag.',
  },
  de: {
    title: 'VOLT Sleep — Wach auf mit Energie. Jeden Tag.',
    description: 'Optimiere deine Energie durch besseren Schlaf. Evidenzbasiertes Coaching, 1 Aktion pro Tag.',
  },
  es: {
    title: 'VOLT Sleep — Despierta con energía. Cada día.',
    description: 'Optimiza tu energía a través de un mejor sueño. Coaching basado en evidencia, 1 acción por día.',
  },
  fr: {
    title: 'VOLT Sleep — Réveillez-vous avec énergie. Chaque jour.',
    description: 'Optimisez votre énergie grâce à un meilleur sommeil. Coaching basé sur les preuves, 1 action par jour.',
  },
}
