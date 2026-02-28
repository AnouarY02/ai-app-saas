'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Slider } from '@/components/ui/Slider'
import { TimeInput } from '@/components/ui/TimeInput'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { createClient } from '@/lib/supabase/client'
import { classifyEnergyProfile } from '@/lib/engine/rules'
import { trackEvent } from '@/lib/analytics'
import { useTranslations } from '@/lib/i18n/context'
import type { OnboardingInput, Chronotype, PrimaryGoal, StartRoute } from '@/lib/types'

const TOTAL_STEPS = 5

export default function OnboardingPage() {
  const { t } = useTranslations()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const CHRONOTYPE_OPTIONS = [
    { value: 'morning', label: t('onboarding.chronotypeMorning'), description: t('onboarding.chronotypeMorningDesc') },
    { value: 'middle', label: t('onboarding.chronotypeMiddle'), description: t('onboarding.chronotypeMiddleDesc') },
    { value: 'evening', label: t('onboarding.chronotypeEvening'), description: t('onboarding.chronotypeEveningDesc') },
  ]

  const GOAL_OPTIONS = [
    { value: 'focus', label: t('onboarding.goalFocus'), description: t('onboarding.goalFocusDesc') },
    { value: 'less-dip', label: t('onboarding.goalDip'), description: t('onboarding.goalDipDesc') },
    { value: 'stable', label: t('onboarding.goalStable'), description: t('onboarding.goalStableDesc') },
    { value: 'sport', label: t('onboarding.goalSport'), description: t('onboarding.goalSportDesc') },
  ]

  const ROUTE_OPTIONS = [
    { value: 'light', label: t('onboarding.routeLight'), description: t('onboarding.routeLightDesc') },
    { value: 'standard', label: t('onboarding.routeStandard'), description: t('onboarding.routeStandardDesc') },
    { value: 'focus', label: t('onboarding.routeFocus'), description: t('onboarding.routeFocusDesc') },
  ]

  const [data, setData] = useState<OnboardingInput>({
    wake_target_weekday: '07:00',
    wake_target_weekend: '08:30',
    current_bedtime_early: '22:30',
    current_bedtime_late: '23:30',
    baseline_energy: 5,
    has_afternoon_dip: false,
    dip_time: '14:00',
    caffeine_cups: 2,
    caffeine_last_time: '14:00',
    screen_after_21: true,
    screen_minutes_late: 60,
    stress_level: 5,
    chronotype: 'middle',
    primary_goal: 'stable',
    start_route: 'standard',
  })

  const update = <K extends keyof OnboardingInput>(key: K, value: OnboardingInput[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const energyProfile = classifyEnergyProfile(data)
  const profileInfo = t(`onboarding.profiles.${energyProfile}.title`)
  const profileDesc = t(`onboarding.profiles.${energyProfile}.description`)

  async function handleComplete() {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('login')
        return
      }

      const { error: profileError } = await supabase.from('onboarding_profiles').upsert({
        user_id: user.id,
        ...data,
        energy_profile: energyProfile,
      }, { onConflict: 'user_id' })

      if (profileError) {
        console.error('Profile save error:', profileError)
        return
      }

      await supabase.from('users').update({
        onboarding_completed: true,
      }).eq('id', user.id)

      trackEvent('onboarding_completed', {
        energy_profile: energyProfile,
        chronotype: data.chronotype,
        primary_goal: data.primary_goal,
        start_route: data.start_route,
      })

      router.push('dashboard')
    } catch (err) {
      console.error('Onboarding error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-volt-500 rounded-full transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-400 font-medium">{step}/{TOTAL_STEPS}</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 pt-20 pb-32">
        {/* Step 1: Wake times */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t('onboarding.step1Title')}</h1>
              <p className="text-gray-500">{t('onboarding.step1Sub')}</p>
            </div>
            <TimeInput
              label={t('onboarding.wakeWeekday')}
              value={data.wake_target_weekday}
              onChange={(v) => update('wake_target_weekday', v)}
            />
            <TimeInput
              label={t('onboarding.wakeWeekend')}
              value={data.wake_target_weekend}
              onChange={(v) => update('wake_target_weekend', v)}
            />
            <TimeInput
              label={t('onboarding.bedtimeEarly')}
              value={data.current_bedtime_early}
              onChange={(v) => update('current_bedtime_early', v)}
            />
            <TimeInput
              label={t('onboarding.bedtimeLate')}
              value={data.current_bedtime_late}
              onChange={(v) => update('current_bedtime_late', v)}
            />
          </div>
        )}

        {/* Step 2: Energy + Dip */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t('onboarding.step2Title')}</h1>
              <p className="text-gray-500">{t('onboarding.step2Sub')}</p>
            </div>
            <Slider
              label={t('onboarding.energyLabel')}
              value={data.baseline_energy}
              onChange={(v) => update('baseline_energy', v)}
              min={1}
              max={10}
              colorScale
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('onboarding.dipQuestion')}
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => update('has_afternoon_dip', true)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                    ${data.has_afternoon_dip ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
                >
                  {t('common.yes')}
                </button>
                <button
                  type="button"
                  onClick={() => update('has_afternoon_dip', false)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                    ${!data.has_afternoon_dip ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
                >
                  {t('common.no')}
                </button>
              </div>
            </div>
            {data.has_afternoon_dip && (
              <TimeInput
                label={t('onboarding.dipTimeLabel')}
                value={data.dip_time || '14:00'}
                onChange={(v) => update('dip_time', v)}
              />
            )}
            <Slider
              label={t('onboarding.stressLabel')}
              value={data.stress_level}
              onChange={(v) => update('stress_level', v)}
              min={1}
              max={10}
            />
          </div>
        )}

        {/* Step 3: Habits */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t('onboarding.step3Title')}</h1>
              <p className="text-gray-500">{t('onboarding.step3Sub')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('onboarding.caffeineLabel')}
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => update('caffeine_cups', Math.max(0, data.caffeine_cups - 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 text-lg font-bold"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-8 text-center">{data.caffeine_cups}</span>
                <button
                  type="button"
                  onClick={() => update('caffeine_cups', Math.min(10, data.caffeine_cups + 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <TimeInput
              label={t('onboarding.caffeineLastLabel')}
              value={data.caffeine_last_time}
              onChange={(v) => update('caffeine_last_time', v)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('onboarding.screenQuestion')}
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => update('screen_after_21', true)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                    ${data.screen_after_21 ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
                >
                  {t('common.yes')}
                </button>
                <button
                  type="button"
                  onClick={() => update('screen_after_21', false)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                    ${!data.screen_after_21 ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
                >
                  {t('common.no')}
                </button>
              </div>
            </div>
            {data.screen_after_21 && (
              <Slider
                label={t('onboarding.screenMinutesLabel')}
                value={data.screen_minutes_late}
                onChange={(v) => update('screen_minutes_late', v)}
                min={0}
                max={180}
                step={15}
              />
            )}
          </div>
        )}

        {/* Step 4: Chronotype + Goal */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t('onboarding.step4Title')}</h1>
              <p className="text-gray-500">{t('onboarding.step4Sub')}</p>
            </div>
            <ToggleGroup
              label={t('onboarding.chronotypeLabel')}
              options={CHRONOTYPE_OPTIONS}
              value={data.chronotype}
              onChange={(v) => update('chronotype', v as Chronotype)}
            />
            <ToggleGroup
              label={t('onboarding.goalLabel')}
              options={GOAL_OPTIONS}
              value={data.primary_goal}
              onChange={(v) => update('primary_goal', v as PrimaryGoal)}
            />
          </div>
        )}

        {/* Step 5: Route + Profile reveal */}
        {step === 5 && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t('onboarding.step5Title')}</h1>
              <p className="text-gray-500">{t('onboarding.step5Sub')}</p>
            </div>

            {/* Profile Card */}
            <div className="card-elevated text-center py-8">
              <div className="text-4xl mb-3">&#9889;</div>
              <div className="text-sm font-medium text-volt-600 mb-1">{t('onboarding.yourProfile')}</div>
              <h2 className="text-2xl font-bold mb-2">{profileInfo}</h2>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                {profileDesc}
              </p>
            </div>

            <ToggleGroup
              label={t('onboarding.routeLabel')}
              options={ROUTE_OPTIONS}
              value={data.start_route}
              onChange={(v) => update('start_route', v as StartRoute)}
            />

            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
              {t('onboarding.autonomyNote')}
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 1 && (
            <Button
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
              className="px-6"
            >
              {t('common.back')}
            </Button>
          )}
          {step < TOTAL_STEPS ? (
            <Button onClick={() => setStep((s) => s + 1)} className="flex-1">
              {t('common.next')}
            </Button>
          ) : (
            <Button onClick={handleComplete} loading={loading} className="flex-1">
              {t('onboarding.startPlan')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
