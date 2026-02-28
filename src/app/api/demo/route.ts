import { NextResponse } from 'next/server'
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit'
import { trackServerEvent } from '@/lib/analytics'
import { selectActions, computeDerivedMetrics, selectTone, selectMicroEducation } from '@/lib/engine/rules'
import type { OnboardingProfile } from '@/lib/types'

/**
 * Demo Mode — generate a sample Daily Energy Card without signup.
 * No DB write. Rate limited by IP.
 */
export async function POST(request: Request) {
  try {
    // Rate limit by IP (using x-forwarded-for or fallback)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
    const rl = checkRateLimit(ip, 'api')
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitHeaders(rl) }
      )
    }

    // Build a demo profile from request body (or use defaults)
    let demoInput: Partial<OnboardingProfile> = {}
    try {
      const body = await request.json()
      demoInput = body || {}
    } catch {
      // Use defaults
    }

    const demoProfile: OnboardingProfile = {
      user_id: 'demo',
      wake_target_weekday: demoInput.wake_target_weekday || '07:00',
      wake_target_weekend: demoInput.wake_target_weekend || '08:30',
      current_bedtime_early: demoInput.current_bedtime_early || '22:30',
      current_bedtime_late: demoInput.current_bedtime_late || '23:30',
      baseline_energy: demoInput.baseline_energy || 5,
      has_afternoon_dip: demoInput.has_afternoon_dip ?? true,
      dip_time: demoInput.dip_time || '14:30',
      caffeine_cups: demoInput.caffeine_cups ?? 3,
      caffeine_last_time: demoInput.caffeine_last_time || '15:00',
      screen_after_21: demoInput.screen_after_21 ?? true,
      screen_minutes_late: demoInput.screen_minutes_late ?? 90,
      stress_level: demoInput.stress_level || 6,
      chronotype: demoInput.chronotype || 'middle',
      primary_goal: demoInput.primary_goal || 'stable',
      start_route: demoInput.start_route || 'standard',
      energy_profile: demoInput.energy_profile || 'crash-prone',
    }

    // Rules-only (no LLM for demo — no cost)
    const metrics = computeDerivedMetrics(demoProfile, [])
    const { primary, secondary } = selectActions(demoProfile, metrics, [])
    const tone = selectTone(demoProfile, metrics, [], 0.5)
    const microEd = selectMicroEducation(metrics, primary.title)

    // Track analytics (no user_id for demo)
    await trackServerEvent('anonymous', 'demo_card_generated')

    return NextResponse.json({
      demo: true,
      card: {
        daily_card: {
          primary_action: primary,
          secondary_actions: secondary,
          micro_education: microEd,
          tone,
        },
        safety: { flags: [], message: '' },
      },
      profile_type: demoProfile.energy_profile,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[API] Demo error:', msg)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
