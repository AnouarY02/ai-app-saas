'use client'

import { createContext, useContext, useCallback } from 'react'

type NestedMessages = { [key: string]: string | NestedMessages }

interface TranslationContextValue {
  messages: NestedMessages
  locale: string
  t: (key: string, params?: Record<string, string | number>) => string
}

const TranslationContext = createContext<TranslationContextValue | null>(null)

export function TranslationProvider({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode
  messages: NestedMessages
  locale: string
}) {
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const parts = key.split('.')
      let current: string | NestedMessages = messages

      for (const part of parts) {
        if (typeof current !== 'object' || current === null) return key
        current = (current as NestedMessages)[part]
      }

      if (typeof current !== 'string') return key

      if (params) {
        let result = current
        for (const [k, v] of Object.entries(params)) {
          result = result.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v))
        }
        return result
      }

      return current
    },
    [messages]
  )

  return (
    <TranslationContext.Provider value={{ messages, locale, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslations() {
  const ctx = useContext(TranslationContext)
  if (!ctx) {
    throw new Error('useTranslations must be used within a TranslationProvider')
  }
  return ctx
}
