import { updateSession } from '@/lib/supabase/middleware'
import { applySecurityHeaders } from '@/lib/security'
import { type NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'nl', 'de', 'es', 'fr']
const defaultLocale = 'en'

/** Paths that should NOT get locale prefixed */
const SKIP_LOCALE_PREFIXES = ['/api/', '/auth/callback', '/_next/', '/favicon.ico']

function getLocaleFromHeaders(request: NextRequest): string {
  // 1. Check cookie
  const cookieLocale = request.cookies.get('volt-locale')?.value
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale

  // 2. Check Accept-Language
  const acceptLang = request.headers.get('accept-language')
  if (acceptLang) {
    const parsed = acceptLang
      .split(',')
      .map((part) => {
        const [lang, q] = part.trim().split(';q=')
        return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 }
      })
      .sort((a, b) => b.q - a.q)

    for (const { lang } of parsed) {
      if (locales.includes(lang)) return lang
      const base = lang.split('-')[0]
      if (locales.includes(base)) return base
    }
  }

  return defaultLocale
}

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip locale routing for API, auth callback, static assets
  if (SKIP_LOCALE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const response = await updateSession(request)
    return applySecurityHeaders(response)
  }

  // Skip for static files
  if (/\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$/.test(pathname)) {
    const response = await updateSession(request)
    return applySecurityHeaders(response)
  }

  // If pathname already has a locale, run session update
  if (pathnameHasLocale(pathname)) {
    const response = await updateSession(request)
    return applySecurityHeaders(response)
  }

  // No locale in pathname → redirect with locale prefix
  const locale = getLocaleFromHeaders(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
