'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Slider } from '@/components/ui/Slider'
import { TimeInput } from '@/components/ui/TimeInput'
import { createClient } from '@/lib/supabase/client'
import { trackEvent } from '@/lib/analytics'

export default function MorningCheckPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [wakeTime, setWakeTime] = useState(
    `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
  )
  const [energyMorning, setEnergyMorning] = useState(5)
  const [hadDip, setHadDip] = useState<boolean | null>(null)

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
          wake_time: wakeTime,
          energy_morning: energyMorning,
          had_dip_yesterday: hadDip,
        },
        { onConflict: 'user_id,date' }
      )

      trackEvent('checkin_completed_morning', {
        energy: energyMorning,
        had_dip: hadDip ?? false,
      })

      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">&#9728;&#65039;</div>
          <h1 className="text-2xl font-bold">Goedemorgen!</h1>
          <p className="text-gray-500 mt-1">10 seconden — dat is alles.</p>
        </div>

        <div className="space-y-8">
          <TimeInput
            label="Hoe laat ben je opgestaan?"
            value={wakeTime}
            onChange={setWakeTime}
          />

          <Slider
            label="Hoe is je energie nu?"
            value={energyMorning}
            onChange={setEnergyMorning}
            min={1}
            max={10}
            colorScale
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Had je gisteren een middagdip?
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setHadDip(true)}
                className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                  ${hadDip === true ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
              >
                Ja
              </button>
              <button
                type="button"
                onClick={() => setHadDip(false)}
                className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all
                  ${hadDip === false ? 'border-volt-500 bg-volt-50 text-volt-700' : 'border-gray-200'}`}
              >
                Nee
              </button>
            </div>
          </div>

          <Button onClick={handleSubmit} loading={loading} className="w-full" size="lg">
            Opslaan
          </Button>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600"
          >
            Overslaan
          </button>
        </div>
      </div>
    </div>
  )
}
