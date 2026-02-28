import { createServerSupabase } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/onboarding'

  // Detect locale from cookie or default to 'en'
  const cookieHeader = request.headers.get('cookie') || ''
  const localeMatch = cookieHeader.match(/volt-locale=(\w+)/)
  const locale = localeMatch?.[1] || 'en'

  if (code) {
    const supabase = createServerSupabase()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Check if user has completed onboarding
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('onboarding_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()

        // If onboarding completed, go to dashboard
        if (profile) {
          return NextResponse.redirect(`${origin}/${locale}/dashboard`)
        }

        // Ensure user record exists
        await supabase.from('users').upsert({
          id: user.id,
          email: user.email!,
          plan: 'free',
          timezone: 'Europe/Amsterdam',
          onboarding_completed: false,
        }, { onConflict: 'id' })
      }

      return NextResponse.redirect(`${origin}/${locale}${next}`)
    }
  }

  // Auth error — redirect to login
  return NextResponse.redirect(`${origin}/${locale}/login?error=auth`)
}
