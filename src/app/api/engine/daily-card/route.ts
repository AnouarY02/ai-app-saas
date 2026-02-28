import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { generateDailyCard } from '@/lib/engine'
import { trackServerEvent } from '@/lib/analytics'

export async function POST() {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]

    // Check if card already exists today
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
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
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

    // Generate card
    const card = await generateDailyCard({
      profile,
      recentLogs: recentLogs || [],
      recentActions: recentActions || [],
      useLLM: userData?.plan === 'premium',
    })

    // Store in database
    const { data: newAction } = await supabase
      .from('actions')
      .insert({
        user_id: user.id,
        date: today,
        primary_action_json: card.daily_card.primary_action,
        secondary_actions_json: card.daily_card.secondary_actions,
        micro_education: card.daily_card.micro_education,
        tone: card.daily_card.tone,
        generated_by_version: userData?.plan === 'premium' ? 'llm-v1' : 'rules-v1',
      })
      .select()
      .single()

    await trackServerEvent(user.id, 'daily_card_viewed')

    return NextResponse.json({ card, action: newAction })
  } catch (error) {
    console.error('[API] Daily card error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
