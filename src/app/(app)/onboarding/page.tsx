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
import type { OnboardingInput, Chronotype, PrimaryGoal, StartRoute } from '@/lib/types'

const TOTAL_STEPS = 5

const CHRONOTYPE_OPTIONS = [
  { value: 'morning', label: 'Ochtendmens', description: 'Je bent het scherpst in de ochtend.' },
  { value: 'middle', label: 'Geen voorkeur', description: 'Je past je makkelijk aan.' },
  { value: 'evening', label: 'Avondmens', description: 'Je komt later op gang, piekenergy in de avond.' },
]

const GOAL_OPTIONS = [
  { value: 'focus', label: 'Meer focus', description: 'Beter kunnen concentreren overdag.' },
  { value: 'less-dip', label: 'Minder dips', description: 'Geen middagdip of energiecrashes.' },
  { value: 'stable', label: 'Stabieler ritme', description: 'Consistent energieniveau.' },
  { value: 'sport', label: 'Sport prestatie', description: 'Betere recovery en prestatie.' },
]

const ROUTE_OPTIONS = [
  { value: 'light', label: 'Light', description: '1 actie per dag, laagdrempelig starten.' },
  { value: 'standard', label: 'Standard', description: '1-2 acties per dag, gebalanceerd.' },
  { value: 'focus', label: 'Focus', description: '2-3 acties per dag, maximaal resultaat.' },
]

const PROFILE_DESCRIPTIONS: Record<string, { title: string; description: string; emoji: string }> = {
  'stabilizer': {
    title: 'Stabilizer',
    emoji: '&#9889;',
    description: 'Je ritme is redelijk stabiel. We gaan finetunen voor optimale energie.',
  },
  'crash-prone': {
    title: 'Crash-Prone',
    emoji: '&#9889;',
    description: 'Je energiedips zijn merkbaar. We gaan je ritme en gewoontes aanpakken.',
  },
  'night-owl-drift': {
    title: 'Night-Owl Drift',
    emoji: '&#127769;',
    description: 'Je biologische klok driftt. We gaan je wake-time en lichtblootstelling optimaliseren.',
  },
  'overcaffeinated': {
    title: 'Overcaffeinated',
    emoji: '&#9749;',
    description: 'Cafeïne maskeert je vermoeidheid. We gaan timing en hoeveelheid optimaliseren.',
  },
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

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
  const profileInfo = PROFILE_DESCRIPTIONS[energyProfile]

  async function handleComplete() {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Save onboarding profile
      const { error: profileError } = await supabase.from('onboarding_profiles').upsert({
        user_id: user.id,
        ...data,
        energy_profile: energyProfile,
      }, { onConflict: 'user_id' })

      if (profileError) {
        console.error('Profile save error:', profileError)
        return
      }

      // Mark onboarding completed
      await supabase.from('users').update({
        onboarding_completed: true,
      }).eq('id', user.id)

      trackEvent('onboarding_completed', {
        energy_profile: energyProfile,
        chronotype: data.chronotype,
        primary_goal: data.primary_goal,
        start_route: data.start_route,
      })

      router.push('/dashboard')
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
              <h1 className="text-2xl font-bold mb-2">Wanneer sta je op?</h1>
              <p className="text-gray-500">Opstaantijd is de #1 factor voor stabiele energie.</p>
            </div>
            <TimeInput
              label="Opstaantijd werkdagen"
              value={data.wake_target_weekday}
              onChange={(v) => update('wake_target_weekday', v)}
            />
            <TimeInput
              label="Opstaantijd weekend"
              value={data.wake_target_weekend}
              onChange={(v) => update('wake_target_weekend', v)}
            />
            <TimeInput
              label="Bedtijd (vroegst)"
              value={data.current_bedtime_early}
              onChange={(v) => update('current_bedtime_early', v)}
            />
            <TimeInput
              label="Bedtijd (laatst)"
              value={data.current_bedtime_late}
              onChange={(v) => update('current_bedtime_late', v)}
            />
          </div>
        )}

        {/* Step 2: Energy + Dip */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h1 className="text-2xl font-bold mb-2">Hoe is je energie?</h1>
              <p className="text-gray-500">Eerlijk antwoorden, geen goed/fout.</p>
            </div>
            <Slider
              label="Energie overdag (gemiddeld)"
              value={data.baseline_energy}
              onChange={(v) => update('baseline_energy', v)}
              min={1}
              max={10}
              colorScale
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Heb je een middagdip?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => update('has_afternoon_dip', true)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                    ${data.has_afternoon_dip ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
                >
                  Ja
                </button>
                <button
                  type="button"
                  onClick={() => update('has_afternoon_dip', false)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                    ${!data.has_afternoon_dip ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
                >
                  Nee
                </button>
              </div>
            </div>
            {data.has_afternoon_dip && (
              <TimeInput
                label="Rond welke tijd?"
                value={data.dip_time || '14:00'}
                onChange={(v) => update('dip_time', v)}
              />
            )}
            <Slider
              label="Stressniveau (gemiddeld)"
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
              <h1 className="text-2xl font-bold mb-2">Je gewoontes</h1>
              <p className="text-gray-500">Cafeïne en schermgebruik — de twee grootste knoppelen.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hoeveel koppen koffie/thee per dag?
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
              label="Laatste cafeïne (rond welke tijd?)"
              value={data.caffeine_last_time}
              onChange={(v) => update('caffeine_last_time', v)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gebruik je schermen na 21:00?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => update('screen_after_21', true)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                    ${data.screen_after_21 ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
                >
                  Ja
                </button>
                <button
                  type="button"
                  onClick={() => update('screen_after_21', false)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                    ${!data.screen_after_21 ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
                >
                  Nee
                </button>
              </div>
            </div>
            {data.screen_after_21 && (
              <Slider
                label="Gemiddelde schermtijd na 21:00 (minuten)"
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
              <h1 className="text-2xl font-bold mb-2">Jouw type & doel</h1>
              <p className="text-gray-500">Zodat we je plan kunnen personaliseren.</p>
            </div>
            <ToggleGroup
              label="Wat voor type ben je?"
              options={CHRONOTYPE_OPTIONS}
              value={data.chronotype}
              onChange={(v) => update('chronotype', v as Chronotype)}
            />
            <ToggleGroup
              label="Wat is je belangrijkste doel?"
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
              <h1 className="text-2xl font-bold mb-2">Je Energy Profile</h1>
              <p className="text-gray-500">Op basis van je antwoorden:</p>
            </div>

            {/* Profile Card */}
            <div className="card-elevated text-center py-8">
              <div className="text-4xl mb-3" dangerouslySetInnerHTML={{ __html: profileInfo.emoji }} />
              <div className="text-sm font-medium text-volt-600 mb-1">Jouw profiel</div>
              <h2 className="text-2xl font-bold mb-2">{profileInfo.title}</h2>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                {profileInfo.description}
              </p>
            </div>

            <ToggleGroup
              label="Kies je startroute"
              options={ROUTE_OPTIONS}
              value={data.start_route}
              onChange={(v) => update('start_route', v as StartRoute)}
            />

            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
              <strong>SDT Autonomie:</strong> Jij kiest het tempo. Je kunt dit altijd aanpassen in instellingen.
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
              Terug
            </Button>
          )}
          {step < TOTAL_STEPS ? (
            <Button onClick={() => setStep((s) => s + 1)} className="flex-1">
              Volgende
            </Button>
          ) : (
            <Button onClick={handleComplete} loading={loading} className="flex-1">
              Start mijn plan
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
