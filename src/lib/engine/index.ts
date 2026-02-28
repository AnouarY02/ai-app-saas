// ============================================================
// VOLT Sleep — Decision Engine: Main Orchestrator
// ============================================================
// Hybrid engine: Rules (deterministic) + LLM (personalization)
// Fallback: if LLM fails, rules output is always valid.
// ============================================================

import type {
  OnboardingProfile,
  DailyLog,
  DailyCardResponse,
  ActionRecord,
} from '../types'
import {
  computeDerivedMetrics,
  selectActions,
  selectTone,
  selectMicroEducation,
  checkSafety,
} from './rules'
import { enhanceWithLLM } from './llm'
import { shouldUseLLM } from '../llm-config'
import { checkCostKillSwitch } from '../cost-telemetry'

interface GenerateCardOptions {
  profile: OnboardingProfile
  recentLogs: DailyLog[]
  recentActions: ActionRecord[]
  useLLM?: boolean // premium feature
  locale?: string
}

/**
 * Generate the Daily Energy Card for a user.
 * This is the main entry point for the decision engine.
 * Respects LLM_MODE config and cost kill switch.
 */
export async function generateDailyCard(
  options: GenerateCardOptions,
): Promise<DailyCardResponse> {
  const { profile, recentLogs, recentActions, useLLM = false, locale } = options

  // 1. Compute derived metrics
  const metrics = computeDerivedMetrics(profile, recentLogs)

  // 2. Run rules engine to select actions
  const { primary, secondary } = selectActions(profile, metrics, recentLogs)

  // 3. Compute completion rate (for tone + LLM context)
  const completionRate = computeCompletionRate(recentActions)

  // 4. Select tone
  const tone = selectTone(profile, metrics, recentLogs, completionRate)

  // 5. Select micro education
  const microEd = selectMicroEducation(metrics, primary.title)

  // 6. Safety check
  const safety = checkSafety(profile, recentLogs)

  // 7. Try LLM enhancement if premium and allowed by cost controls
  const costMode = checkCostKillSwitch()
  const llmAllowed = useLLM && shouldUseLLM('daily_card', useLLM) && costMode !== 'rules-only'

  if (llmAllowed) {
    const llmResult = await enhanceWithLLM({
      profile,
      metrics,
      recentLogs,
      rulesOutput: { primary, secondary },
      tone,
      completionRate,
      locale,
    })

    if (llmResult) {
      // Merge safety flags from rules engine (always takes precedence)
      if (safety.flags.length > 0) {
        llmResult.safety = safety
      }
      return llmResult
    }
    // LLM failed — fall through to rules-only output
  }

  // 8. Return rules-only output
  return {
    daily_card: {
      primary_action: primary,
      secondary_actions: secondary,
      micro_education: microEd,
      tone,
    },
    safety,
  }
}

function computeCompletionRate(recentActions: ActionRecord[]): number {
  if (recentActions.length === 0) return 0.5 // neutral baseline

  const completed = recentActions.filter((a) => a.completed_primary).length
  return completed / recentActions.length
}

/**
 * Generate a weekly report for a user.
 */
export async function generateWeeklyReport(
  profile: OnboardingProfile,
  weekLogs: DailyLog[],
  weekActions: ActionRecord[],
) {
  const metrics = computeDerivedMetrics(profile, weekLogs)
  const energyScores = weekLogs
    .filter((l) => l.energy_morning !== null)
    .map((l) => l.energy_morning!)
  const avgEnergy =
    energyScores.length > 0
      ? energyScores.reduce((a, b) => a + b, 0) / energyScores.length
      : null

  // Pattern detection (rules-based)
  const insights: Array<{
    title: string
    description: string
    impact: string
    category: string
  }> = []

  if (metrics.weekend_shift_minutes > 90) {
    insights.push({
      title: 'Weekend shift gedetecteerd',
      description: `Je staat in het weekend ${metrics.weekend_shift_minutes} min later op dan doordeweeks. Dit verstoort je biologische klok.`,
      impact: 'Weekend shift >90 min correleert met lagere maandagenergie.',
      category: 'weekend_shift',
    })
  }

  if (metrics.caffeine_risk === 'high') {
    insights.push({
      title: 'Late cafeïne impact',
      description: 'Je cafeïne-inname is laat op de dag, wat je diepe slaap kan verminderen.',
      impact: 'Cafeïne na 14:00 vermindert diepe slaap met 15-20%.',
      category: 'caffeine',
    })
  }

  if (metrics.regularity_score < 50) {
    insights.push({
      title: 'Opstaantijd inconsistent',
      description: `Je regulariteitsscore is ${metrics.regularity_score}/100. Een consistenter opstaanmoment verbetert energie binnen een week.`,
      impact: 'Elke 30 min meer consistentie = merkbaar verschil in alertheid.',
      category: 'wake_consistency',
    })
  }

  const completionRate = computeCompletionRate(weekActions)
  if (completionRate >= 0.7) {
    insights.push({
      title: 'Sterke week!',
      description: `Je hebt ${Math.round(completionRate * 100)}% van je acties voltooid. Consistentie is de sleutel.`,
      impact: 'Volhouden leidt binnen 2-3 weken tot meetbaar betere energie.',
      category: 'energy_trend',
    })
  }

  return {
    insights,
    avg_energy: avgEnergy ? Math.round(avgEnergy * 10) / 10 : null,
    regularity_score: metrics.regularity_score,
  }
}
