import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { computeDerivedMetrics } from '@/lib/engine/rules'
import { generateEnergyInsight } from '@/lib/engine/llm'
import { trackServerEvent } from '@/lib/analytics'
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit'
import { shouldUseLLM } from '@/lib/llm-config'

/**
 * POST /api/energy-insight-share
 * Generates a shareable energy insight for viral sharing.
 * Uses LLM (under 300 tokens) for premium users, rules-based fallback for free.
 */
export async function POST(request: Request) {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    const cookieHeader = request.headers.get('cookie') || ''
    const localeMatch = cookieHeader.match(/volt-locale=(\w+)/)
    const locale = localeMatch?.[1] || 'en'

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit: 5 req/min
    const rl = checkRateLimit(user.id, 'engine')
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitHeaders(rl) }
      )
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

    // Load recent logs
    const { data: recentLogs } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(7)

    const metrics = computeDerivedMetrics(profile, recentLogs || [])

    // Check if user is premium + LLM allowed
    const { data: userData } = await supabase
      .from('users')
      .select('plan')
      .eq('id', user.id)
      .single()
    const isPremium = userData?.plan === 'premium'
    const useLLM = shouldUseLLM('energy_share', isPremium)

    let result: { hook: string; insight: string; tweet: string }

    if (useLLM) {
      const llmResult = await generateEnergyInsight(profile, metrics, locale)
      if (llmResult) {
        result = llmResult
      } else {
        result = generateRulesBasedInsight(profile, metrics)
      }
    } else {
      result = generateRulesBasedInsight(profile, metrics)
    }

    await trackServerEvent(user.id, 'share_card_generated')

    return NextResponse.json(result)
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[API] Energy insight share error:', msg)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Rules-based fallback for generating shareable insights.
 * Zero LLM cost.
 */
function generateRulesBasedInsight(
  profile: { energy_profile: string; chronotype: string; primary_goal: string },
  metrics: { regularity_score: number; caffeine_risk: string; crash_risk: string },
): { hook: string; insight: string; tweet: string } {
  const insights = [
    {
      condition: metrics.caffeine_risk === 'high',
      hook: 'Your coffee is lying to you.',
      insight: 'Late caffeine masks fatigue but cuts deep sleep by 15-20%. Moving your cutoff to before 1 PM changes everything.',
      tweet: 'Your coffee after 2 PM isn\'t giving you energy \u2014 it\'s stealing tomorrow\'s. Cut it off at 1 PM for a week. Thank me later. #VOLTSleep #EnergyHack',
    },
    {
      condition: metrics.regularity_score < 50,
      hook: 'The #1 energy hack is free.',
      insight: 'Consistent wake time beats every supplement, hack, and biohack. Your body clock runs on predictability.',
      tweet: 'The most powerful energy hack costs nothing: wake up at the same time every day. Even weekends. Your body clock will reward you. #VOLTSleep',
    },
    {
      condition: metrics.crash_risk === 'high',
      hook: 'Your afternoon crash is preventable.',
      insight: '10 minutes of outdoor walking at your dip time gives a natural energy boost without caffeine. Light + movement resets your alertness.',
      tweet: 'Stop reaching for coffee at 3 PM. 10 min outdoor walk = natural energy reset. Light + movement > caffeine. #VOLTSleep #Performance',
    },
    {
      condition: profile.chronotype === 'evening',
      hook: 'Night owls can win mornings too.',
      insight: 'Morning light exposure within 60 min of waking shifts your clock forward naturally. Works in 3-5 days.',
      tweet: 'Night owl? 12 min of morning light within 1 hour of waking will shift your clock forward. No willpower needed. #VOLTSleep #Chronotype',
    },
  ]

  const matched = insights.find((i) => i.condition)
  if (matched) {
    return { hook: matched.hook, insight: matched.insight, tweet: matched.tweet }
  }

  // Default
  return {
    hook: 'Energy is a skill, not luck.',
    insight: 'Small, consistent changes to your routine compound into dramatically better energy. 1 action per day, 7 days to feel the difference.',
    tweet: 'Energy isn\'t about sleep tracking or supplements. It\'s 1 behavioral change per day, compounded. 7 days to feel different. #VOLTSleep',
  }
}
