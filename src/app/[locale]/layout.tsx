import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, localeMeta, type Locale, isValidLocale } from '@/lib/i18n/config'
import { getMessages } from '@/lib/i18n'
import { TranslationProvider } from '@/lib/i18n/context'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as Locale
  const meta = localeMeta[locale] || localeMeta.en

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`])
      ),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isValidLocale(params.locale)) {
    notFound()
  }

  const locale = params.locale as Locale
  const messages = await getMessages(locale)

  return (
    <html lang={locale}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <TranslationProvider messages={messages} locale={locale}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  )
}
