// ============================================================
// VOLT Sleep — Decision Engine: LLM Layer
// ============================================================
// Uses Anthropic Claude for personalized copy, coaching tone,
// and nuanced explanations. Falls back to rules-only on failure.
// ============================================================

import type {
  OnboardingProfile,
  DailyLog,
  DerivedMetrics,
  DailyCardResponse,
  PrimaryAction,
  SecondaryAction,
  CardTone,
} from '../types'

const SYSTEM_PROMPT = `Je bent de VOLT Sleep Coach — een vriendelijke, evidence-based energiecoach.

REGELS:
1. Je bent GEEN arts, therapeut of medisch professional.
2. Doe NOOIT medische claims ("behandelt insomnia", "geneest", etc.).
3. Gebruik altijd taal als "gedragsprincipes", "routine-optimalisatie", "energiemanagement".
4. Wees beknopt: max 2 zinnen per veld.
5. Wees warm maar direct. Geen zweverig taalgebruik, geen toxic positivity.
6. Focus op ENERGIE OVERDAG, niet op "slaapproblemen".
7. Als iemand signalen van ernstige nood toont → verwijs naar professionele hulp.
8. Gebruik "je" (informeel), niet "u".
9. Schrijf in het Nederlands.
10. Geef altijd een concreet, actionable advies. Geen vage adviezen als "slaap beter".
11. Het if-then plan moet een specifiek obstakel + specifieke oplossing bevatten.
12. Pas de tone aan: "neutral" = informatief, "coach" = bemoedigend, "strict" = direct/to-the-point.`

const OUTPUT_SCHEMA = `Antwoord UITSLUITEND met valid JSON in dit schema:
{
  "daily_card": {
    "primary_action": {
      "title": "korte titel (max 8 woorden)",
      "minutes": 0,
      "why": "1 zin waarom dit werkt (evidence-based)",
      "how": "1-2 zinnen hoe dit te doen",
      "if_then": {
        "if": "specifiek obstakel",
        "then": "specifieke oplossing"
      }
    },
    "secondary_actions": [
      {"title": "", "minutes": 0, "how": ""}
    ],
    "micro_education": "1 zin evidence-based feit",
    "tone": "neutral|coach|strict"
  },
  "safety": {
    "flags": [],
    "message": ""
  }
}`

export interface LLMInput {
  profile: OnboardingProfile
  metrics: DerivedMetrics
  recentLogs: DailyLog[]
  rulesOutput: {
    primary: PrimaryAction
    secondary: SecondaryAction[]
  }
  tone: CardTone
  completionRate: number
}

/**
 * Enhance the rules-based output with LLM-generated personalized copy.
 * Falls back to rules output on any LLM failure.
 */
export async function enhanceWithLLM(input: LLMInput): Promise<DailyCardResponse | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  const userContext = buildUserContext(input)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `${userContext}\n\n${OUTPUT_SCHEMA}\n\nGenereer de Daily Energy Card voor vandaag.`,
          },
        ],
      }),
    })

    if (!response.ok) {
      console.error('[VOLT LLM] API error:', response.status)
      return null
    }

    const data = await response.json()
    const text = data.content?.[0]?.text
    if (!text) return null

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null

    const parsed = JSON.parse(jsonMatch[0]) as DailyCardResponse

    // Validate required fields exist
    if (!parsed.daily_card?.primary_action?.title) return null

    return parsed
  } catch (error) {
    console.error('[VOLT LLM] Error:', error)
    return null
  }
}

function buildUserContext(input: LLMInput): string {
  const { profile, metrics, recentLogs, rulesOutput, tone, completionRate } = input

  const lastLog = recentLogs[0]
  const dayOfWeek = new Date().toLocaleDateString('nl-NL', { weekday: 'long' })

  return `GEBRUIKERSPROFIEL:
- Energy Profile: ${profile.energy_profile}
- Chronotype: ${profile.chronotype}
- Doel: ${profile.primary_goal}
- Route: ${profile.start_route}
- Opstaantijd target: ${profile.wake_target_weekday}
- Baseline energie: ${profile.baseline_energy}/10
- Cafeïne: ${profile.caffeine_cups} kopjes, laatste om ${profile.caffeine_last_time}
- Scherm na 21:00: ${profile.screen_after_21 ? 'ja' : 'nee'}
- Stress: ${profile.stress_level}/10

METRICS VANDAAG:
- Regulariteit: ${metrics.regularity_score}/100
- Cafeïnerisico: ${metrics.caffeine_risk}
- Crash risico: ${metrics.crash_risk}
- Bedtijd drift: ${metrics.bedtime_drift} min
- Weekend shift: ${metrics.weekend_shift_minutes} min
- Licht prioriteit: ${metrics.light_exposure_priority}

RECENTE DATA:
- Dag: ${dayOfWeek}
- Laatste energie ochtend: ${lastLog?.energy_morning ?? 'onbekend'}/10
- Laatste stress avond: ${lastLog?.stress_evening ?? 'onbekend'}/10
- Actie completie rate: ${Math.round(completionRate * 100)}%
- Middagdip gisteren: ${lastLog?.had_dip_yesterday ? 'ja' : 'nee/onbekend'}

RULES ENGINE SUGGESTIE (gebruik als basis, verbeter de copy):
- Primary: ${rulesOutput.primary.title}
- Why: ${rulesOutput.primary.why}
- Secondary: ${rulesOutput.secondary.map((s) => s.title).join(', ') || 'geen'}

GEVRAAGDE TONE: ${tone}
Schrijf warm, concreet en in het Nederlands.`
}

/**
 * Generate weekly report insights using LLM.
 */
export async function generateWeeklyInsights(
  profile: OnboardingProfile,
  weekLogs: DailyLog[],
  metrics: DerivedMetrics,
): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  const energyScores = weekLogs
    .filter((l) => l.energy_morning !== null)
    .map((l) => `${l.date}: ${l.energy_morning}/10`)
    .join(', ')

  const prompt = `Analyseer deze weekdata voor een VOLT Sleep gebruiker en geef 1-3 inzichten.

PROFIEL: ${profile.energy_profile}, chronotype ${profile.chronotype}, doel: ${profile.primary_goal}
METRICS: regulariteit ${metrics.regularity_score}/100, cafeïnerisico ${metrics.caffeine_risk}, crashrisico ${metrics.crash_risk}
ENERGIE SCORES: ${energyScores || 'geen data'}
WEEKEND SHIFT: ${metrics.weekend_shift_minutes} min

Antwoord als JSON array:
[{"title": "", "description": "", "impact": "", "category": "weekend_shift|caffeine|screen|wake_consistency|energy_trend"}]

Regels: geen medische claims, focus op gedragsprincipes, concreet en actionable, Nederlands.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.content?.[0]?.text ?? null
  } catch {
    return null
  }
}
