'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Slider } from '@/components/ui/Slider'
import { TimeInput } from '@/components/ui/TimeInput'
import { createClient } from '@/lib/supabase/client'
import { trackEvent } from '@/lib/analytics'
import { useTranslations } from '@/lib/i18n/context'

export default function NightCheckPage() {
  const { t } = useTranslations()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [bedtime, setBedtime] = useState('23:00')
  const [stressEvening, setStressEvening] = useState(5)
  const [lastScreen, setLastScreen] = useState('22:00')
  const [caffeineLast, setCaffeineLast] = useState('14:00')
  const [caffeineCups, setCaffeineCups] = useState(2)

  async function handleSubmit() {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const today = new Date().toISOString().split('T')[0]

      await supabase.from('daily_logs').upsert(
        {
          user_id: user.id,
          date: today,
          bedtime_time: bedtime,
          stress_evening: stressEvening,
          last_screen_time: lastScreen,
          caffeine_last_time: caffeineLast,
          caffeine_cups: caffeineCups,
        },
        { onConflict: 'user_id,date' }
      )

      trackEvent('checkin_completed_night', {
        stress: stressEvening,
        caffeine_cups: caffeineCups,
      })

      router.push('dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">&#127769;</div>
          <h1 className="text-2xl font-bold">{t('checkin.nightTitle')}</h1>
          <p className="text-gray-500 mt-1">{t('checkin.nightSub')}</p>
        </div>

        <div className="space-y-8">
          <TimeInput
            label={t('checkin.bedtimeLabel')}
            value={bedtime}
            onChange={setBedtime}
          />

          <Slider
            label={t('checkin.stressEveningLabel')}
            value={stressEvening}
            onChange={setStressEvening}
            min={1}
            max={10}
          />

          <TimeInput
            label={t('checkin.lastScreenLabel')}
            value={lastScreen}
            onChange={setLastScreen}
          />

          <TimeInput
            label={t('checkin.caffeineLastLabel')}
            value={caffeineLast}
            onChange={setCaffeineLast}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('checkin.caffeineCupsLabel')}
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCaffeineCups(Math.max(0, caffeineCups - 1))}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 text-lg font-bold"
              >
                -
              </button>
              <span className="text-2xl font-bold w-8 text-center">{caffeineCups}</span>
              <button
                type="button"
                onClick={() => setCaffeineCups(Math.min(10, caffeineCups + 1))}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          <Button onClick={handleSubmit} loading={loading} className="w-full" size="lg">
            {t('checkin.nightSave')}
          </Button>

          <button
            onClick={() => router.push('dashboard')}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600"
          >
            {t('common.skip')}
          </button>
        </div>
      </div>
    </div>
  )
}
