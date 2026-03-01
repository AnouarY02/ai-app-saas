import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/onboarding'

  // Detect locale from cookie or default to 'en'
  const cookieHeader = request.headers.get('cookie') || ''
  const localeMatch = cookieHeader.match(/volt-locale=(\w+)/)
  const locale = localeMatch?.[1] || 'en'

  if (code) {
    // Track cookies that Supabase sets during session exchange
    const cookiesToForward: Array<{ name: string; value: string; options?: Record<string, unknown> }> = []

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookies: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
            cookiesToForward.push(...cookies)
            // Also update request cookies so subsequent reads see the session
            cookies.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Check if user has completed onboarding
      const { data: { user } } = await supabase.auth.getUser()

      let redirectPath = `/${locale}${next}`

      if (user) {
        const { data: profile } = await supabase
          .from('onboarding_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()

        // If onboarding completed, go to dashboard
        if (profile) {
          redirectPath = `/${locale}/dashboard`
        } else {
          // Ensure user record exists
          await supabase.from('users').upsert({
            id: user.id,
            email: user.email!,
            plan: 'free',
            timezone: 'Europe/Amsterdam',
            onboarding_completed: false,
          }, { onConflict: 'id' })
        }
      }

      // Explicitly forward session cookies on the redirect response
      const response = NextResponse.redirect(`${origin}${redirectPath}`)
      cookiesToForward.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options as any)
      })
      return response
    }
  }

  // Auth error — redirect to login
  return NextResponse.redirect(`${origin}/${locale}/login?error=auth`)
}
