import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { generateWeeklyReport } from '@/lib/engine'
import { trackServerEvent } from '@/lib/analytics-server'
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit'

export async function POST() {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit
    const rl = checkRateLimit(user.id, 'engine')
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitHeaders(rl) }
      )
    }

    // Check premium
    const { data: userData } = await supabase
      .from('users')
      .select('plan')
      .eq('id', user.id)
      .single()

    if (userData?.plan !== 'premium') {
      return NextResponse.json({ error: 'Premium required' }, { status: 403 })
    }

    // Get week bounds (Monday to Sunday)
    const now = new Date()
    const dayOfWeek = now.getDay()
    const monday = new Date(now)
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
    const weekStart = monday.toISOString().split('T')[0]

    // Check if report already exists
    const { data: existing } = await supabase
      .from('weekly_reports')
      .select('*')
      .eq('user_id', user.id)
      .eq('week_start', weekStart)
      .single()

    if (existing) {
      return NextResponse.json({ report: existing })
    }

    // Load profile
    const { data: profile } = await supabase
      .from('onboarding_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Load week's logs
    const { data: weekLogs } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', weekStart)
      .order('date', { ascending: false })

    // Load week's actions
    const { data: weekActions } = await supabase
      .from('actions')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', weekStart)
      .order('date', { ascending: false })

    // Generate report
    const report = await generateWeeklyReport(
      profile,
      weekLogs || [],
      weekActions || [],
    )

    // Store report
    const { data: newReport } = await supabase
      .from('weekly_reports')
      .insert({
        user_id: user.id,
        week_start: weekStart,
        insights_json: report.insights,
        avg_energy: report.avg_energy,
        regularity_score: report.regularity_score,
      })
      .select()
      .single()

    await trackServerEvent(user.id, 'weekly_report_viewed')

    return NextResponse.json({ report: newReport })
  } catch (error) {
    console.error('[API] Weekly report error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
