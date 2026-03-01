import { z } from 'zod'

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

export const onboardingSchema = z.object({
  wake_target_weekday: z.string().regex(timeRegex, 'Gebruik HH:MM formaat'),
  wake_target_weekend: z.string().regex(timeRegex, 'Gebruik HH:MM formaat'),
  current_bedtime_early: z.string().regex(timeRegex, 'Gebruik HH:MM formaat'),
  current_bedtime_late: z.string().regex(timeRegex, 'Gebruik HH:MM formaat'),
  baseline_energy: z.number().min(1).max(10),
  has_afternoon_dip: z.boolean(),
  dip_time: z.string().regex(timeRegex).nullable(),
  caffeine_cups: z.number().min(0).max(20),
  caffeine_last_time: z.string().regex(timeRegex, 'Gebruik HH:MM formaat'),
  screen_after_21: z.boolean(),
  screen_minutes_late: z.number().min(0).max(480),
  stress_level: z.number().min(1).max(10),
  chronotype: z.enum(['morning', 'middle', 'evening']),
  primary_goal: z.enum(['focus', 'less-dip', 'stable', 'sport']),
  start_route: z.enum(['light', 'standard', 'focus']),
})

export const morningCheckSchema = z.object({
  wake_time: z.string().regex(timeRegex, 'Gebruik HH:MM formaat'),
  energy_morning: z.number().min(1).max(10),
  had_dip_yesterday: z.boolean(),
})

export const nightCheckSchema = z.object({
  bedtime_time: z.string().regex(timeRegex, 'Gebruik HH:MM formaat'),
  stress_evening: z.number().min(1).max(10),
  last_screen_time: z.string().regex(timeRegex).nullable(),
  caffeine_last_time: z.string().regex(timeRegex).nullable(),
  caffeine_cups: z.number().min(0).max(20).nullable(),
})

export const completeActionSchema = z.object({
  action_id: z.string().uuid(),
  completed_primary: z.boolean(),
  completed_secondary_count: z.number().min(0),
})

export type OnboardingFormData = z.infer<typeof onboardingSchema>
export type MorningCheckData = z.infer<typeof morningCheckSchema>
export type NightCheckData = z.infer<typeof nightCheckSchema>
