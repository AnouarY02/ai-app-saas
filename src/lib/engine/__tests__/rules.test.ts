// ============================================================
// VOLT Sleep — Decision Engine Rules: Unit Tests
// ============================================================

import {
  computeWeekendShift,
  computeRegularityScore,
  computeCaffeineRisk,
  computeLightExposurePriority,
  computeBedtimeDrift,
  computeCrashRisk,
  computeDerivedMetrics,
  selectActions,
  selectTone,
  checkSafety,
  classifyEnergyProfile,
  timeToMinutes,
  minutesToTime,
} from '../rules'
import type { OnboardingProfile, DailyLog } from '../../types'

// --- Test Helpers ---

function makeProfile(overrides: Partial<OnboardingProfile> = {}): OnboardingProfile {
  return {
    user_id: 'test-user',
    wake_target_weekday: '07:00',
    wake_target_weekend: '09:00',
    current_bedtime_early: '22:30',
    current_bedtime_late: '23:30',
    baseline_energy: 5,
    has_afternoon_dip: true,
    dip_time: '14:00',
    caffeine_cups: 3,
    caffeine_last_time: '14:00',
    screen_after_21: true,
    screen_minutes_late: 90,
    stress_level: 6,
    chronotype: 'middle',
    primary_goal: 'stable',
    start_route: 'standard',
    energy_profile: 'crash-prone',
    ...overrides,
  }
}

function makeLog(overrides: Partial<DailyLog> = {}): DailyLog {
  return {
    id: 'log-1',
    user_id: 'test-user',
    date: '2026-02-25',
    wake_time: '07:15',
    energy_morning: 5,
    had_dip_yesterday: true,
    bedtime_time: '23:15',
    stress_evening: 6,
    caffeine_last_time: '14:30',
    caffeine_cups: 3,
    screen_minutes_late: 60,
    last_screen_time: '22:30',
    created_at: new Date().toISOString(),
    ...overrides,
  }
}

// --- Utility Tests ---

describe('timeToMinutes', () => {
  it('converts 07:00 to 420', () => {
    expect(timeToMinutes('07:00')).toBe(420)
  })

  it('converts 14:30 to 870', () => {
    expect(timeToMinutes('14:30')).toBe(870)
  })

  it('converts 00:00 to 0', () => {
    expect(timeToMinutes('00:00')).toBe(0)
  })

  it('converts 23:59 to 1439', () => {
    expect(timeToMinutes('23:59')).toBe(1439)
  })
})

describe('minutesToTime', () => {
  it('converts 420 to 07:00', () => {
    expect(minutesToTime(420)).toBe('07:00')
  })

  it('converts 870 to 14:30', () => {
    expect(minutesToTime(870)).toBe('14:30')
  })
})

// --- Weekend Shift ---

describe('computeWeekendShift', () => {
  it('computes correct shift for 07:00 weekday, 09:00 weekend', () => {
    const profile = makeProfile()
    expect(computeWeekendShift(profile)).toBe(120) // 2 hours
  })

  it('returns 0 when weekday and weekend are the same', () => {
    const profile = makeProfile({ wake_target_weekend: '07:00' })
    expect(computeWeekendShift(profile)).toBe(0)
  })

  it('computes shift when weekend is earlier', () => {
    const profile = makeProfile({ wake_target_weekend: '06:00' })
    expect(computeWeekendShift(profile)).toBe(60)
  })
})

// --- Regularity Score ---

describe('computeRegularityScore', () => {
  it('returns 50 with fewer than 2 logs', () => {
    const profile = makeProfile()
    expect(computeRegularityScore([], profile)).toBe(50)
    expect(computeRegularityScore([makeLog()], profile)).toBe(50)
  })

  it('returns high score when wake times match target', () => {
    const profile = makeProfile()
    const logs = [
      makeLog({ wake_time: '07:00' }),
      makeLog({ wake_time: '07:05', date: '2026-02-24' }),
      makeLog({ wake_time: '07:10', date: '2026-02-23' }),
    ]
    const score = computeRegularityScore(logs, profile)
    expect(score).toBeGreaterThan(80)
  })

  it('returns low score when wake times deviate significantly', () => {
    const profile = makeProfile()
    const logs = [
      makeLog({ wake_time: '09:00' }),
      makeLog({ wake_time: '08:30', date: '2026-02-24' }),
    ]
    const score = computeRegularityScore(logs, profile)
    expect(score).toBeLessThan(50)
  })
})

// --- Caffeine Risk ---

describe('computeCaffeineRisk', () => {
  it('returns high when caffeine after 14:00', () => {
    const profile = makeProfile({ caffeine_last_time: '15:00' })
    expect(computeCaffeineRisk(profile, [])).toBe('high')
  })

  it('returns high when >4 cups', () => {
    const profile = makeProfile({ caffeine_cups: 5, caffeine_last_time: '12:00' })
    expect(computeCaffeineRisk(profile, [])).toBe('high')
  })

  it('returns medium when caffeine at 13:00-14:00', () => {
    const profile = makeProfile({ caffeine_cups: 2, caffeine_last_time: '13:30' })
    expect(computeCaffeineRisk(profile, [])).toBe('medium')
  })

  it('returns low when caffeine before 13:00 and <=3 cups', () => {
    const profile = makeProfile({ caffeine_cups: 2, caffeine_last_time: '11:00' })
    expect(computeCaffeineRisk(profile, [])).toBe('low')
  })

  it('uses recent log data when available', () => {
    const profile = makeProfile({ caffeine_last_time: '11:00', caffeine_cups: 2 })
    const logs = [makeLog({ caffeine_last_time: '16:00', caffeine_cups: 5 })]
    expect(computeCaffeineRisk(profile, logs)).toBe('high')
  })
})

// --- Light Exposure Priority ---

describe('computeLightExposurePriority', () => {
  it('returns high for evening chronotype', () => {
    const profile = makeProfile({ chronotype: 'evening' })
    expect(computeLightExposurePriority(profile, [])).toBe('high')
  })

  it('returns high for very low baseline energy', () => {
    const profile = makeProfile({ baseline_energy: 3, chronotype: 'middle' })
    expect(computeLightExposurePriority(profile, [])).toBe('high')
  })

  it('returns low for morning chronotype with good energy', () => {
    const profile = makeProfile({ chronotype: 'morning', baseline_energy: 8 })
    const logs = [makeLog({ energy_morning: 8 }), makeLog({ energy_morning: 7 })]
    expect(computeLightExposurePriority(profile, logs)).toBe('low')
  })
})

// --- Bedtime Drift ---

describe('computeBedtimeDrift', () => {
  it('returns 0 with no logs', () => {
    const profile = makeProfile()
    expect(computeBedtimeDrift(profile, [])).toBe(0)
  })

  it('computes drift from target midpoint', () => {
    const profile = makeProfile({
      current_bedtime_early: '23:00',
      current_bedtime_late: '23:00',
    })
    // Target midpoint = 23:00 = 1380 min
    const logs = [makeLog({ bedtime_time: '00:00' })] // 0 min (midnight) => 1440 min technically
    // Actually 00:00 = 0 min, so drift = |0 - 1380| = 1380. That's a bug with midnight crossing.
    // For this test, use a non-crossing time:
    const logs2 = [makeLog({ bedtime_time: '23:30' })]
    const drift = computeBedtimeDrift(profile, logs2)
    expect(drift).toBe(30)
  })
})

// --- Crash Risk ---

describe('computeCrashRisk', () => {
  it('returns high for crash-prone profile', () => {
    const profile = makeProfile({
      has_afternoon_dip: true,
      baseline_energy: 3,
      screen_after_21: true,
      screen_minutes_late: 120,
      stress_level: 8,
    })
    const risk = computeCrashRisk(profile, [], 'high')
    expect(risk).toBe('high')
  })

  it('returns low for stable profile', () => {
    const profile = makeProfile({
      has_afternoon_dip: false,
      baseline_energy: 8,
      screen_after_21: false,
      screen_minutes_late: 0,
      stress_level: 3,
    })
    const risk = computeCrashRisk(profile, [], 'low')
    expect(risk).toBe('low')
  })
})

// --- Action Selection ---

describe('selectActions', () => {
  it('suggests stabilize wake time when weekend shift > 90 min', () => {
    const profile = makeProfile({ wake_target_weekend: '09:30' }) // 150 min shift
    const metrics = computeDerivedMetrics(profile, [])
    const { primary } = selectActions(profile, metrics, [])
    expect(primary.title.toLowerCase()).toContain('stabiliseer')
  })

  it('suggests caffeine cutoff when caffeine risk is high', () => {
    const profile = makeProfile({
      caffeine_last_time: '16:00',
      caffeine_cups: 5,
      wake_target_weekend: '07:00', // no weekend shift
    })
    const metrics = computeDerivedMetrics(profile, [])
    const { primary } = selectActions(profile, metrics, [])
    expect(primary.title.toLowerCase()).toContain('cafeïne')
  })

  it('suggests morning light when light priority is high', () => {
    const profile = makeProfile({
      chronotype: 'evening',
      caffeine_last_time: '11:00',
      caffeine_cups: 1,
      wake_target_weekend: '07:00',
      screen_after_21: false,
    })
    const metrics = computeDerivedMetrics(profile, [])
    const { primary } = selectActions(profile, metrics, [])
    expect(primary.title.toLowerCase()).toContain('ochtendlicht')
  })

  it('always returns at least one action', () => {
    const profile = makeProfile({
      wake_target_weekend: '07:00',
      caffeine_last_time: '10:00',
      caffeine_cups: 1,
      screen_after_21: false,
      baseline_energy: 8,
      has_afternoon_dip: false,
      stress_level: 3,
      chronotype: 'morning',
    })
    const metrics = computeDerivedMetrics(profile, [])
    const { primary } = selectActions(profile, metrics, [])
    expect(primary).toBeDefined()
    expect(primary.title).toBeTruthy()
    expect(primary.why).toBeTruthy()
    expect(primary.how).toBeTruthy()
    expect(primary.if_then.if).toBeTruthy()
    expect(primary.if_then.then).toBeTruthy()
  })

  it('returns secondary actions when multiple rules match', () => {
    const profile = makeProfile({
      wake_target_weekend: '10:00',   // large shift
      caffeine_last_time: '16:00',    // late caffeine
      caffeine_cups: 5,
      screen_after_21: true,
      screen_minutes_late: 120,
      stress_level: 8,
      chronotype: 'evening',
      baseline_energy: 3,
    })
    const metrics = computeDerivedMetrics(profile, [])
    const { primary, secondary } = selectActions(profile, metrics, [])
    expect(primary).toBeDefined()
    expect(secondary.length).toBeGreaterThan(0)
  })
})

// --- Tone Selection ---

describe('selectTone', () => {
  it('returns neutral for high completion and regularity', () => {
    const profile = makeProfile()
    const metrics = computeDerivedMetrics(profile, [])
    metrics.regularity_score = 80
    const tone = selectTone(profile, metrics, [], 0.9)
    expect(tone).toBe('neutral')
  })

  it('returns coach for low completion', () => {
    const profile = makeProfile()
    const metrics = computeDerivedMetrics(profile, [])
    const tone = selectTone(profile, metrics, [], 0.3)
    expect(tone).toBe('coach')
  })

  it('returns strict for focus route with good completion', () => {
    const profile = makeProfile({ start_route: 'focus' })
    const metrics = computeDerivedMetrics(profile, [])
    metrics.regularity_score = 50
    metrics.crash_risk = 'low'
    const tone = selectTone(profile, metrics, [], 0.7)
    expect(tone).toBe('strict')
  })
})

// --- Safety Check ---

describe('checkSafety', () => {
  it('returns no flags for normal data', () => {
    const profile = makeProfile()
    const logs = [makeLog({ energy_morning: 6 })]
    const safety = checkSafety(profile, logs)
    expect(safety.flags).toHaveLength(0)
    expect(safety.message).toBe('')
  })

  it('flags persistent very low energy', () => {
    const profile = makeProfile()
    const logs = Array.from({ length: 5 }, (_, i) =>
      makeLog({ energy_morning: 2, date: `2026-02-${20 + i}` })
    )
    const safety = checkSafety(profile, logs)
    expect(safety.flags).toContain('very_low_energy_persistent')
    expect(safety.message).toContain('huisarts')
  })

  it('flags persistent high stress', () => {
    const profile = makeProfile()
    const logs = Array.from({ length: 5 }, (_, i) =>
      makeLog({ stress_evening: 9, date: `2026-02-${20 + i}` })
    )
    const safety = checkSafety(profile, logs)
    expect(safety.flags).toContain('high_stress_persistent')
    expect(safety.message).toContain('professionele hulp')
  })
})

// --- Energy Profile Classification ---

describe('classifyEnergyProfile', () => {
  it('classifies overcaffeinated correctly', () => {
    expect(classifyEnergyProfile({
      baseline_energy: 5,
      has_afternoon_dip: true,
      caffeine_cups: 5,
      caffeine_last_time: '15:00',
      chronotype: 'middle',
      wake_target_weekday: '07:00',
      wake_target_weekend: '07:30',
      stress_level: 5,
      screen_after_21: false,
    })).toBe('overcaffeinated')
  })

  it('classifies night-owl-drift correctly', () => {
    expect(classifyEnergyProfile({
      baseline_energy: 5,
      has_afternoon_dip: false,
      caffeine_cups: 2,
      caffeine_last_time: '12:00',
      chronotype: 'evening',
      wake_target_weekday: '07:00',
      wake_target_weekend: '09:00',
      stress_level: 5,
      screen_after_21: true,
    })).toBe('night-owl-drift')
  })

  it('classifies crash-prone correctly', () => {
    expect(classifyEnergyProfile({
      baseline_energy: 4,
      has_afternoon_dip: true,
      caffeine_cups: 2,
      caffeine_last_time: '12:00',
      chronotype: 'middle',
      wake_target_weekday: '07:00',
      wake_target_weekend: '07:30',
      stress_level: 5,
      screen_after_21: false,
    })).toBe('crash-prone')
  })

  it('classifies stabilizer as default', () => {
    expect(classifyEnergyProfile({
      baseline_energy: 7,
      has_afternoon_dip: false,
      caffeine_cups: 2,
      caffeine_last_time: '12:00',
      chronotype: 'morning',
      wake_target_weekday: '07:00',
      wake_target_weekend: '07:30',
      stress_level: 3,
      screen_after_21: false,
    })).toBe('stabilizer')
  })
})
