import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { generateDailyCard } from '@/lib/engine'
import { trackServerEvent } from '@/lib/analytics'
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit'
import { shouldUseLLM } from '@/lib/llm-config'

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    // Detect locale from cookie or Accept-Language
    const cookieHeader = request.headers.get('cookie') || ''
    const localeMatch = cookieHeader.match(/volt-locale=(\w+)/)
    const locale = localeMatch?.[1] || 'en'

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit: 10 req/min per user for engine routes
    const rl = checkRateLimit(user.id, 'engine')
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitHeaders(rl) }
      )
    }

    const today = new Date().toISOString().split('T')[0]

    // Check if card already exists today (cache hit)
    const { data: existing } = await supabase
      .from('actions')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()

    if (existing) {
      return NextResponse.json({
        card: {
          daily_card: {
            primary_action: existing.primary_action_json,
            secondary_actions: existing.secondary_actions_json,
            micro_education: existing.micro_education || '',
            tone: existing.tone,
          },
          safety: { flags: [], message: '' },
        },
        action: existing,
      })
    }

    // Load profile
    const { data: profile } = await supabase
      .from('onboarding_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found — complete onboarding first' }, { status: 404 })
    }

    // Load recent logs (7 days)
    const { data: recentLogs } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(7)

    // Load recent actions (7 days)
    const { data: recentActions } = await supabase
      .from('actions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(7)

    // Check if premium
    const { data: userData } = await supabase
      .from('users')
      .select('plan')
      .eq('id', user.id)
      .single()

    // Generate card — respect LLM_MODE config
    const isPremium = userData?.plan === 'premium'
    const useLLM = isPremium && shouldUseLLM('daily_card', isPremium)

    const card = await generateDailyCard({
      profile,
      recentLogs: recentLogs || [],
      recentActions: recentActions || [],
      useLLM,
      locale,
    })

    // Store in database — track generation method precisely
    const genVersion = useLLM ? 'llm-v1' : isPremium ? 'rules-v1-premium' : 'rules-v1'
    const { data: newAction, error: insertError } = await supabase
      .from('actions')
      .insert({
        user_id: user.id,
        date: today,
        primary_action_json: card.daily_card.primary_action,
        secondary_actions_json: card.daily_card.secondary_actions,
        micro_education: card.daily_card.micro_education,
        tone: card.daily_card.tone,
        generated_by_version: genVersion,
      })
      .select()
      .single()

    if (insertError) {
      console.error('[API] Failed to store daily card:', insertError.message)
    }

    await trackServerEvent(user.id, 'daily_card_viewed')

    return NextResponse.json({ card, action: newAction })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[API] Daily card error:', msg)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
