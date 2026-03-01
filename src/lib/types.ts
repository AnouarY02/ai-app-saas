// ============================================================
// VOLT Sleep — Core Type Definitions
// ============================================================

// --- Enums ---

export type Chronotype = 'morning' | 'middle' | 'evening'
export type EnergyProfile = 'stabilizer' | 'crash-prone' | 'night-owl-drift' | 'overcaffeinated'
export type PrimaryGoal = 'focus' | 'less-dip' | 'stable' | 'sport'
export type StartRoute = 'light' | 'standard' | 'focus'
export type CaffeineRisk = 'low' | 'medium' | 'high'
export type LightExposurePriority = 'low' | 'medium' | 'high'
export type CrashRisk = 'low' | 'medium' | 'high'
export type CardTone = 'neutral' | 'coach' | 'strict'
export type SubscriptionPlan = 'free' | 'premium'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'

// --- Onboarding ---

export interface OnboardingProfile {
  user_id: string
  wake_target_weekday: string    // HH:MM
  wake_target_weekend: string    // HH:MM
  current_bedtime_early: string  // HH:MM
  current_bedtime_late: string   // HH:MM
  baseline_energy: number        // 1-10
  has_afternoon_dip: boolean
  dip_time: string | null        // HH:MM
  caffeine_cups: number
  caffeine_last_time: string     // HH:MM
  screen_after_21: boolean
  screen_minutes_late: number
  stress_level: number           // 1-10
  chronotype: Chronotype
  primary_goal: PrimaryGoal
  start_route: StartRoute
  energy_profile: EnergyProfile
}

export interface OnboardingInput {
  wake_target_weekday: string
  wake_target_weekend: string
  current_bedtime_early: string
  current_bedtime_late: string
  baseline_energy: number
  has_afternoon_dip: boolean
  dip_time: string | null
  caffeine_cups: number
  caffeine_last_time: string
  screen_after_21: boolean
  screen_minutes_late: number
  stress_level: number
  chronotype: Chronotype
  primary_goal: PrimaryGoal
  start_route: StartRoute
}

// --- Daily Log ---

export interface DailyLog {
  id: string
  user_id: string
  date: string // YYYY-MM-DD
  // Morning check
  wake_time: string | null       // HH:MM
  energy_morning: number | null  // 1-10
  had_dip_yesterday: boolean | null
  // Night check
  bedtime_time: string | null    // HH:MM
  stress_evening: number | null  // 1-10
  caffeine_last_time: string | null
  caffeine_cups: number | null
  screen_minutes_late: number | null
  last_screen_time: string | null // HH:MM
  created_at: string
}

// --- Actions / Daily Card ---

export interface IfThenPlan {
  if: string
  then: string
}

export interface PrimaryAction {
  title: string
  minutes: number
  why: string
  how: string
  if_then: IfThenPlan
}

export interface SecondaryAction {
  title: string
  minutes: number
  how: string
}

export interface DailyCard {
  primary_action: PrimaryAction
  secondary_actions: SecondaryAction[]
  micro_education: string
  tone: CardTone
}

export interface SafetyOutput {
  flags: string[]
  message: string
}

export interface DailyCardResponse {
  daily_card: DailyCard
  safety: SafetyOutput
}

export interface ActionRecord {
  id: string
  user_id: string
  date: string
  primary_action_json: PrimaryAction
  secondary_actions_json: SecondaryAction[]
  generated_by_version: string
  completed_primary: boolean
  completed_secondary_count: number
  created_at: string
}

// --- Weekly Report ---

export interface WeeklyInsight {
  title: string
  description: string
  impact: string
  category: 'weekend_shift' | 'caffeine' | 'screen' | 'wake_consistency' | 'energy_trend'
}

export interface WeeklyReport {
  id: string
  user_id: string
  week_start: string
  insights: WeeklyInsight[]
  avg_energy: number
  regularity_score: number
  generated_at: string
}

// --- Derived Metrics (Decision Engine) ---

export interface DerivedMetrics {
  regularity_score: number        // 0-100
  caffeine_risk: CaffeineRisk
  light_exposure_priority: LightExposurePriority
  bedtime_drift: number           // minutes
  crash_risk: CrashRisk
  weekend_shift_minutes: number
}

// --- User ---

export interface User {
  id: string
  email: string
  created_at: string
  plan: SubscriptionPlan
  timezone: string
  display_name: string | null
  onboarding_completed: boolean
}

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string
  stripe_subscription_id: string
  status: SubscriptionStatus
  plan: SubscriptionPlan
  current_period_end: string
}

// --- Analytics Events ---

export type AnalyticsEvent =
  | 'signup_completed'
  | 'onboarding_started'
  | 'onboarding_completed'
  | 'onboarding_step_completed'
  | 'onboarding_abandoned'
  | 'daily_card_viewed'
  | 'primary_action_completed'
  | 'checkin_completed_night'
  | 'checkin_completed_morning'
  | 'weekly_report_viewed'
  | 'paywall_viewed'
  | 'subscription_started'
  | 'subscription_canceled'
  | 'cognitive_switch_used'
  | 'demo_card_generated'
  | 'referral_shared'
  | 'referral_signup'
  | 'referral_converted'
  | 'locale_changed'
  | 'user_activated'
  | 'instant_value_preview'
  | 'conversion_trigger'
  | 'experiment_assigned'
  | 'energy_improvement'
  | 'streak_milestone'
  | 'share_card_generated'

export interface AnalyticsPayload {
  event: AnalyticsEvent
  user_id: string
  properties?: Record<string, string | number | boolean>
  timestamp: string
}
