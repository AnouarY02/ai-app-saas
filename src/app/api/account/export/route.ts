import { NextResponse } from 'next/server'
import { createServerSupabase, createServiceSupabase } from '@/lib/supabase/server'
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit'

/**
 * GET /api/account/export
 * GDPR Article 20: Data portability.
 * Returns all user data as a JSON download.
 */
export async function GET() {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rl = checkRateLimit(user.id, 'api')
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitHeaders(rl) },
      )
    }

    const serviceSupabase = createServiceSupabase()

    // Fetch all user data in parallel
    const [
      userData,
      profileData,
      logsData,
      actionsData,
      reportsData,
      subscriptionData,
      eventsData,
    ] = await Promise.all([
      serviceSupabase.from('users').select('*').eq('id', user.id).single(),
      serviceSupabase.from('onboarding_profiles').select('*').eq('user_id', user.id).single(),
      serviceSupabase.from('daily_logs').select('*').eq('user_id', user.id).order('date', { ascending: false }),
      serviceSupabase.from('actions').select('*').eq('user_id', user.id).order('date', { ascending: false }),
      serviceSupabase.from('weekly_reports').select('*').eq('user_id', user.id).order('week_start', { ascending: false }),
      serviceSupabase.from('subscriptions').select('*').eq('user_id', user.id).single(),
      serviceSupabase.from('analytics_events').select('event, properties, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1000),
    ])

    const exportData = {
      exported_at: new Date().toISOString(),
      data_controller: {
        name: 'VOLT Sleep',
        email: 'privacy@voltsleep.nl',
        jurisdiction: 'Netherlands (EU)',
      },
      account: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        ...(userData.data || {}),
      },
      onboarding_profile: profileData.data || null,
      daily_logs: logsData.data || [],
      daily_energy_cards: actionsData.data || [],
      weekly_reports: reportsData.data || [],
      subscription: subscriptionData.data || null,
      analytics_events: eventsData.data || [],
    }

    // Return as downloadable JSON
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="volt-sleep-data-export-${new Date().toISOString().split('T')[0]}.json"`,
      },
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[API] Data export error:', msg)
    return NextResponse.json(
      { error: 'Export failed — contact privacy@voltsleep.nl' },
      { status: 500 },
    )
  }
}
