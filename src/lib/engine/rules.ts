// ============================================================
// VOLT Sleep — Decision Engine: Rules Layer (Deterministic)
// ============================================================
// Based on: COM-B, BCT Taxonomy v1, CBT-I principles, Fogg Model
// All rules are evidence-based behavioral principles — NOT medical advice.
// ============================================================

import type {
  OnboardingProfile,
  DailyLog,
  DerivedMetrics,
  PrimaryAction,
  SecondaryAction,
  IfThenPlan,
  CaffeineRisk,
  CrashRisk,
  LightExposurePriority,
  CardTone,
} from '../types'

// --- Derived Metrics Computation ---

export function computeDerivedMetrics(
  profile: OnboardingProfile,
  recentLogs: DailyLog[],
): DerivedMetrics {
  const weekendShift = computeWeekendShift(profile)
  const regularityScore = computeRegularityScore(recentLogs, profile)
  const caffeineRisk = computeCaffeineRisk(profile, recentLogs)
  const lightPriority = computeLightExposurePriority(profile, recentLogs)
  const bedtimeDrift = computeBedtimeDrift(profile, recentLogs)
  const crashRisk = computeCrashRisk(profile, recentLogs, caffeineRisk)

  return {
    regularity_score: regularityScore,
    caffeine_risk: caffeineRisk,
    light_exposure_priority: lightPriority,
    bedtime_drift: bedtimeDrift,
    crash_risk: crashRisk,
    weekend_shift_minutes: weekendShift,
  }
}

/** Minutes difference between weekday and weekend wake target */
export function computeWeekendShift(profile: OnboardingProfile): number {
  const weekday = timeToMinutes(profile.wake_target_weekday)
  const weekend = timeToMinutes(profile.wake_target_weekend)
  return Math.abs(weekend - weekday)
}

/** 0-100 based on wake time consistency over recent logs */
export function computeRegularityScore(
  logs: DailyLog[],
  profile: OnboardingProfile,
): number {
  if (logs.length < 2) return 50 // neutral baseline

  const wakeTimes = logs
    .filter((l) => l.wake_time !== null)
    .map((l) => timeToMinutes(l.wake_time!))

  if (wakeTimes.length < 2) return 50

  const target = timeToMinutes(profile.wake_target_weekday)
  const deviations = wakeTimes.map((t) => Math.abs(t - target))
  const avgDeviation = deviations.reduce((a, b) => a + b, 0) / deviations.length

  // 0 min deviation = 100, 60+ min = 0
  return Math.max(0, Math.min(100, Math.round(100 - (avgDeviation / 60) * 100)))
}

export function computeCaffeineRisk(
  profile: OnboardingProfile,
  recentLogs: DailyLog[],
): CaffeineRisk {
  const lastCaffeineTime = recentLogs.length > 0 && recentLogs[0].caffeine_last_time
    ? timeToMinutes(recentLogs[0].caffeine_last_time)
    : timeToMinutes(profile.caffeine_last_time)
  const cups = recentLogs.length > 0 && recentLogs[0].caffeine_cups !== null
    ? recentLogs[0].caffeine_cups
    : profile.caffeine_cups

  // Caffeine after 14:00 OR >4 cups = high risk
  if (lastCaffeineTime >= 840 || cups > 4) return 'high' // 14:00 = 840 min
  if (lastCaffeineTime >= 780 || cups > 3) return 'medium' // 13:00 = 780 min
  return 'low'
}

export function computeLightExposurePriority(
  profile: OnboardingProfile,
  recentLogs: DailyLog[],
): LightExposurePriority {
  // Night owls and people with low energy benefit most from morning light
  if (profile.chronotype === 'evening') return 'high'
  if (profile.baseline_energy <= 4) return 'high'

  const recentEnergy = recentLogs
    .filter((l) => l.energy_morning !== null)
    .map((l) => l.energy_morning!)

  if (recentEnergy.length > 0) {
    const avg = recentEnergy.reduce((a, b) => a + b, 0) / recentEnergy.length
    if (avg <= 5) return 'high'
    if (avg <= 7) return 'medium'
  }

  return profile.chronotype === 'middle' ? 'medium' : 'low'
}

export function computeBedtimeDrift(
  profile: OnboardingProfile,
  recentLogs: DailyLog[],
): number {
  if (recentLogs.length === 0) return 0

  const targetMid =
    (timeToMinutes(profile.current_bedtime_early) +
      timeToMinutes(profile.current_bedtime_late)) / 2

  const actualBedtimes = recentLogs
    .filter((l) => l.bedtime_time !== null)
    .map((l) => timeToMinutes(l.bedtime_time!))

  if (actualBedtimes.length === 0) return 0

  const avgActual = actualBedtimes.reduce((a, b) => a + b, 0) / actualBedtimes.length
  return Math.round(Math.abs(avgActual - targetMid))
}

export function computeCrashRisk(
  profile: OnboardingProfile,
  recentLogs: DailyLog[],
  caffeineRisk: CaffeineRisk,
): CrashRisk {
  let riskScore = 0

  if (profile.has_afternoon_dip) riskScore += 2
  if (profile.baseline_energy <= 4) riskScore += 2
  if (caffeineRisk === 'high') riskScore += 2
  if (caffeineRisk === 'medium') riskScore += 1
  if (profile.screen_after_21 && profile.screen_minutes_late > 60) riskScore += 1
  if (profile.stress_level >= 7) riskScore += 1

  // Check recent dip reports
  const recentDips = recentLogs.filter((l) => l.had_dip_yesterday === true).length
  if (recentDips >= 3) riskScore += 2

  if (riskScore >= 5) return 'high'
  if (riskScore >= 3) return 'medium'
  return 'low'
}

// --- Action Selection Rules ---

interface ActionCandidate {
  priority: number // lower = higher priority
  action: PrimaryAction
}

export function selectActions(
  profile: OnboardingProfile,
  metrics: DerivedMetrics,
  recentLogs: DailyLog[],
): { primary: PrimaryAction; secondary: SecondaryAction[] } {
  const candidates: ActionCandidate[] = []

  // Rule 1: Weekend shift > 90 min → stabilize wake time
  if (metrics.weekend_shift_minutes > 90) {
    candidates.push({
      priority: 1,
      action: {
        title: 'Stabiliseer je opstaantijd',
        minutes: 0,
        why: 'Een verschil van >90 min tussen werkdagen en weekend verstoort je biologische klok (social jetlag).',
        how: `Zet je wekker op ${profile.wake_target_weekday}, ook in het weekend. Start met max 30 min verschil.`,
        if_then: {
          if: 'Als je moe bent in het weekend',
          then: 'Sta toch op tijd op en neem een korte powernap (max 20 min) voor 14:00.',
        },
      },
    })
  }

  // Rule 2: High caffeine risk → earlier cutoff
  if (metrics.caffeine_risk === 'high') {
    const cutoffHour = 13
    candidates.push({
      priority: 2,
      action: {
        title: `Cafeïne cutoff om ${cutoffHour}:00`,
        minutes: 0,
        why: 'Cafeïne heeft een halfwaardetijd van 5-7 uur. Laat drinken verstoort diepe slaap, ook als je wel inslaapt.',
        how: `Drink je laatste koffie/thee voor ${cutoffHour}:00. Daarna water, kruidenthee of decaf.`,
        if_then: {
          if: 'Als je een middagdip hebt na de cutoff',
          then: 'Loop 5-10 minuten buiten of drink een groot glas koud water.',
        },
      },
    })
  }

  // Rule 3: Screen after 21:00 + bedtime drift → screen cutoff
  if (profile.screen_after_21 && metrics.bedtime_drift > 30) {
    candidates.push({
      priority: 2,
      action: {
        title: 'Scherm uit 45 min voor bed',
        minutes: 45,
        why: 'Blauw licht onderdrukt melatonine. Maar het is vooral de mentale stimulatie die je wakker houdt.',
        how: `Stop met schermen om ${computeScreenCutoff(profile)}. Leg je telefoon in een andere kamer.`,
        if_then: {
          if: 'Als je toch je telefoon pakt',
          then: 'Zet een 2-min timer, doe wat je moet doen, en leg hem terug.',
        },
      },
    })
  }

  // Rule 4: High light exposure priority → morning light
  if (metrics.light_exposure_priority === 'high') {
    candidates.push({
      priority: 1,
      action: {
        title: '12 min ochtendlicht binnen 60 min',
        minutes: 12,
        why: 'Daglicht in de ochtend reset je biologische klok en verbetert alertheid. Werkt binnen 3-5 dagen.',
        how: 'Ga naar buiten binnen 60 min na opstaan. Bewolkt? Toch effectief. Zonnebril af.',
        if_then: {
          if: 'Als het regent of je hebt geen tijd',
          then: 'Sta 5 min bij het raam met het meeste licht. Beter dan niks.',
        },
      },
    })
  }

  // Rule 5: High stress → wind-down routine
  const lastStress = recentLogs.length > 0 ? recentLogs[0].stress_evening : profile.stress_level
  if ((lastStress ?? profile.stress_level) >= 7) {
    candidates.push({
      priority: 3,
      action: {
        title: 'Avond wind-down (10 min)',
        minutes: 10,
        why: 'Stress activeert je sympathisch zenuwstelsel. Een korte wind-down helpt je lichaam om te schakelen.',
        how: 'Kies 1: ademhaling 4-7-8, lezen, stretching, of opschrijven wat je bezighoudt.',
        if_then: {
          if: 'Als je merkt dat je piekert',
          then: 'Schrijf 3 dingen op die je morgen gaat doen. Je brein kan ze dan "loslaten".',
        },
      },
    })
  }

  // Rule 6: Crash prone + afternoon dip → strategic nap or light exposure
  if (metrics.crash_risk === 'high' && profile.has_afternoon_dip) {
    candidates.push({
      priority: 2,
      action: {
        title: 'Middagboost: 10 min buiten lopen',
        minutes: 10,
        why: 'Beweging + licht rond je dip-moment geeft een natuurlijke energieboost zonder cafeïne.',
        how: `Loop rond ${profile.dip_time || '14:00'} 10 min buiten. Snel tempo, geen telefoon.`,
        if_then: {
          if: 'Als je echt niet kunt lopen',
          then: 'Sta op, rek uit, en drink koud water. Voorkom dat je gaat zitten scrollen.',
        },
      },
    })
  }

  // Rule 7: Low energy + medium caffeine → bedtime window
  if (profile.baseline_energy <= 5 && metrics.caffeine_risk !== 'high') {
    const bedtimeWindow = computeBedtimeWindow(profile)
    candidates.push({
      priority: 3,
      action: {
        title: `Bedtijd window: ${bedtimeWindow}`,
        minutes: 0,
        why: 'Een consistent bedtijd-window (15 min range) helpt je lichaam om op tijd slaperig te worden.',
        how: `Ga tussen ${bedtimeWindow} naar bed. Niet eerder (anders lig je wakker), niet later.`,
        if_then: {
          if: 'Als je nog niet slaperig bent op dat moment',
          then: 'Doe iets saais (opvouwen, lezen) tot je ogen zwaar worden. Niet in bed liggen wachten.',
        },
      },
    })
  }

  // Fallback: always have at least one action
  if (candidates.length === 0) {
    candidates.push({
      priority: 5,
      action: {
        title: 'Consistent opstaanmoment',
        minutes: 0,
        why: 'Een vast opstaanmoment is de #1 factor voor stabiele energie. Belangrijker dan bedtijd.',
        how: `Sta op om ${profile.wake_target_weekday}, ook als je slecht hebt geslapen. Je lichaam past zich aan.`,
        if_then: {
          if: 'Als je snoozt',
          then: 'Zet je wekker aan de andere kant van de kamer. Opstaan = commitment.',
        },
      },
    })
  }

  // Sort by priority
  candidates.sort((a, b) => a.priority - b.priority)

  const primary = candidates[0].action
  const secondary: SecondaryAction[] = candidates
    .slice(1, 3)
    .map((c) => ({
      title: c.action.title,
      minutes: c.action.minutes,
      how: c.action.how,
    }))

  return { primary, secondary }
}

// --- Tone Selection ---

export function selectTone(
  profile: OnboardingProfile,
  metrics: DerivedMetrics,
  recentLogs: DailyLog[],
  completionRate: number, // 0-1
): CardTone {
  // If user is doing well → neutral (low pressure)
  if (completionRate >= 0.8 && metrics.regularity_score >= 70) return 'neutral'
  // If user is struggling → coach (encouraging)
  if (completionRate < 0.5 || metrics.crash_risk === 'high') return 'coach'
  // If user chosen focus route and has momentum → strict (direct)
  if (profile.start_route === 'focus' && completionRate >= 0.6) return 'strict'
  return 'neutral'
}

// --- Micro Education Pool ---

const MICRO_EDUCATION: Record<string, string[]> = {
  light: [
    'Ochtendlicht is de krachtigste zeitgeber (tijdgever) voor je biologische klok.',
    'Zelfs op een bewolkte dag krijg je buiten 10.000+ lux. Binnen is dat slechts 200-500 lux.',
    'Daglicht in de ochtend verschuift je melatonine-start naar eerder op de avond.',
  ],
  caffeine: [
    'Cafeïne blokkeert adenosine, de stof die slaapdruk opbouwt. Na 5-7 uur is nog de helft actief.',
    'Zelfs als je "goed slaapt" na late koffie, vermindert het je diepe slaap met 15-20%.',
    'Cafeïne is geen energie — het maskeert vermoeidheid. Echte energie komt van slaap en ritme.',
  ],
  screen: [
    'Het is niet alleen blauw licht: scrollen activeert je dopaminesysteem vlak voor bed.',
    'Je brein heeft 30-60 min nodig om van "actief" naar "slaapklaar" te schakelen.',
    'Telefoon in een andere kamer → betere slaapkwaliteit. Bewezen in onderzoek.',
  ],
  consistency: [
    'Social jetlag (weekend uitslapen) heeft hetzelfde effect als 2 tijdzones vliegen.',
    'Je biologische klok wordt primair geset door 2 dingen: licht en opstaanmoment.',
    'Consistent opstaan is belangrijker dan consistent naar bed gaan.',
  ],
  stress: [
    'Piekeren activeert je HPA-as (stressrespons). Een wind-down routine helpt die te dempen.',
    '"Ik moet nu slapen" → hogere spanning. "Rust is ook goed" → lagere spanning en sneller slapen.',
    'Opschrijven wat je bezighoudt vermindert nachtelijk piekeren met 40% (Scullin, 2018).',
  ],
  general: [
    'Slaap is geen luxe maar een biologische noodzaak. Net als eten en bewegen.',
    'Energiedips zijn normaal. Het gaat erom dat je ze kunt voorspellen en managen.',
    'Kleine, consistente veranderingen werken beter dan grote, perfecte plannen.',
  ],
}

export function selectMicroEducation(
  metrics: DerivedMetrics,
  primaryTitle: string,
): string {
  let category = 'general'
  if (primaryTitle.toLowerCase().includes('licht') || primaryTitle.toLowerCase().includes('ochtend')) {
    category = 'light'
  } else if (primaryTitle.toLowerCase().includes('cafeïne') || primaryTitle.toLowerCase().includes('koffie')) {
    category = 'caffeine'
  } else if (primaryTitle.toLowerCase().includes('scherm')) {
    category = 'screen'
  } else if (primaryTitle.toLowerCase().includes('stabiliseer') || primaryTitle.toLowerCase().includes('opstaan')) {
    category = 'consistency'
  } else if (primaryTitle.toLowerCase().includes('wind-down') || primaryTitle.toLowerCase().includes('stress')) {
    category = 'stress'
  }

  const pool = MICRO_EDUCATION[category] || MICRO_EDUCATION.general
  return pool[Math.floor(Math.random() * pool.length)]
}

// --- Safety Rules ---

export interface SafetyCheck {
  flags: string[]
  message: string
}

export function checkSafety(
  profile: OnboardingProfile,
  recentLogs: DailyLog[],
): SafetyCheck {
  const flags: string[] = []
  let message = ''

  // Check for consistently very low energy (potential clinical concern)
  const recentEnergy = recentLogs
    .filter((l) => l.energy_morning !== null)
    .map((l) => l.energy_morning!)
  if (recentEnergy.length >= 5) {
    const avg = recentEnergy.reduce((a, b) => a + b, 0) / recentEnergy.length
    if (avg <= 2) {
      flags.push('very_low_energy_persistent')
      message = 'Je energie is al meerdere dagen erg laag. Dit kan veel oorzaken hebben. We raden aan om contact op te nemen met je huisarts voor persoonlijk advies.'
    }
  }

  // Check for high stress consistently
  const recentStress = recentLogs
    .filter((l) => l.stress_evening !== null)
    .map((l) => l.stress_evening!)
  if (recentStress.length >= 5) {
    const avgStress = recentStress.reduce((a, b) => a + b, 0) / recentStress.length
    if (avgStress >= 9) {
      flags.push('high_stress_persistent')
      message = 'Je stressniveau is consistent hoog. VOLT Sleep is geen vervanging voor professionele hulp. Overweeg contact met je huisarts of een psycholoog.'
    }
  }

  return { flags, message }
}

// --- Utility Functions ---

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24
  const m = minutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

function computeScreenCutoff(profile: OnboardingProfile): string {
  const bedtimeEarly = timeToMinutes(profile.current_bedtime_early)
  const cutoff = bedtimeEarly - 45
  return minutesToTime(cutoff)
}

function computeBedtimeWindow(profile: OnboardingProfile): string {
  return `${profile.current_bedtime_early}–${profile.current_bedtime_late}`
}

// --- Energy Profile Classification ---

export function classifyEnergyProfile(input: {
  baseline_energy: number
  has_afternoon_dip: boolean
  caffeine_cups: number
  caffeine_last_time: string
  chronotype: string
  wake_target_weekday: string
  wake_target_weekend: string
  stress_level: number
  screen_after_21: boolean
}): string {
  const weekendShift = Math.abs(
    timeToMinutes(input.wake_target_weekend) - timeToMinutes(input.wake_target_weekday)
  )

  // Overcaffeinated: high caffeine + late timing
  if (input.caffeine_cups >= 4 || timeToMinutes(input.caffeine_last_time) >= 840) {
    return 'overcaffeinated'
  }

  // Night-owl drift: evening chronotype + large weekend shift
  if (input.chronotype === 'evening' && weekendShift > 60) {
    return 'night-owl-drift'
  }

  // Crash-prone: afternoon dip + low energy
  if (input.has_afternoon_dip && input.baseline_energy <= 5) {
    return 'crash-prone'
  }

  // Default: stabilizer
  return 'stabilizer'
}
