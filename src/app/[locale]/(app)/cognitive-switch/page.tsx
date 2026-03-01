'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'
import { useTranslations } from '@/lib/i18n/context'

export default function CognitiveSwitchPage() {
  const { t } = useTranslations()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selectedThought, setSelectedThought] = useState<number | null>(null)
  const [breathCount, setBreathCount] = useState(0)
  const [breathing, setBreathing] = useState(false)

  // Action options from translations
  const actionOptions: string[] = (() => {
    try {
      const opts = t('cognitiveSwitch.actionOptions')
      // If it returns the key, the value is an array in JSON
      return typeof opts === 'string' && opts.startsWith('[')
        ? JSON.parse(opts)
        : [opts]
    } catch {
      return [
        'Read something boring for 10 minutes',
        'Write 3 things for tomorrow',
        '5 minutes gentle stretching',
        'Listen to a calm podcast or audiobook',
      ]
    }
  })()

  function startBreathing() {
    setBreathing(true)
    trackEvent('cognitive_switch_used')
    let count = 0
    const interval = setInterval(() => {
      count++
      setBreathCount(count)
      if (count >= 4) {
        clearInterval(interval)
        setBreathing(false)
      }
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-night-950 text-white">
      <header className="px-6 py-4 flex items-center justify-between max-w-lg mx-auto">
        <Link href="dashboard" className="text-night-300 hover:text-white">
          &larr; {t('common.back')}
        </Link>
        <span className="text-night-400 text-sm">{t('cognitiveSwitch.title')}</span>
        <div className="w-6" />
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        {/* Step 0: Identify thought */}
        {step === 0 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">{t('cognitiveSwitch.step1Title')}</h1>
              <p className="text-night-300">{t('cognitiveSwitch.step1Sub')}</p>
            </div>
            <div>
              <textarea
                className="w-full bg-night-900 border-2 border-night-700 rounded-xl p-4 text-white placeholder-night-500 resize-none h-24 focus:outline-none focus:border-night-400"
                placeholder={t('cognitiveSwitch.thoughtPlaceholder')}
                onChange={() => setSelectedThought(0)}
              />
            </div>
            {selectedThought !== null && (
              <Button
                onClick={() => setStep(1)}
                className="w-full bg-night-600 hover:bg-night-500"
              >
                {t('common.next')}
              </Button>
            )}
          </div>
        )}

        {/* Step 1: Reframe */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">{t('cognitiveSwitch.step2Title')}</h1>
              <p className="text-night-300">{t('cognitiveSwitch.step2Sub')}</p>
            </div>
            <div className="bg-night-900 rounded-xl p-6">
              <p className="text-white font-medium leading-relaxed">
                {t('cognitiveSwitch.step2Sub')}
              </p>
            </div>
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-night-600 hover:bg-night-500"
            >
              {t('cognitiveSwitch.step3Title')}
            </Button>
          </div>
        )}

        {/* Step 2: Breathing */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in text-center">
            <h1 className="text-2xl font-bold">{t('cognitiveSwitch.step3Title')}</h1>
            <p className="text-night-300">{t('cognitiveSwitch.step3Sub')}</p>

            <div className="py-12">
              <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center
                border-4 border-night-400 transition-all duration-[5000ms]
                ${breathing ? 'scale-125 border-night-300' : 'scale-100'}`}
              >
                <span className="text-3xl font-bold">{breathCount}/4</span>
              </div>
              <div className="text-night-400 mt-4 text-sm">
                {breathing
                  ? `${t('cognitiveSwitch.breatheIn')}... ${t('cognitiveSwitch.hold')}... ${t('cognitiveSwitch.breatheOut')}...`
                  : breathCount >= 4
                  ? t('common.done')
                  : ''}
              </div>
            </div>

            {breathCount < 4 && !breathing && (
              <Button
                onClick={startBreathing}
                className="bg-night-600 hover:bg-night-500"
              >
                {breathCount === 0 ? 'Start' : t('common.next')}
              </Button>
            )}
            {breathCount >= 4 && (
              <Button
                onClick={() => setStep(3)}
                className="w-full bg-night-600 hover:bg-night-500"
              >
                {t('common.next')}
              </Button>
            )}
          </div>
        )}

        {/* Step 3: Action */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in text-center">
            <h1 className="text-2xl font-bold">{t('cognitiveSwitch.step4Title')}</h1>
            <p className="text-night-300">{t('cognitiveSwitch.step4Sub')}</p>
            <div className="space-y-3 text-left">
              {actionOptions.map((opt, i) => (
                <div key={i} className="bg-night-900 rounded-xl p-4 text-sm text-white">
                  {opt}
                </div>
              ))}
            </div>

            <Button
              onClick={() => router.push('dashboard')}
              className="w-full bg-night-600 hover:bg-night-500"
            >
              {t('common.back')}
            </Button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 text-xs text-night-500 text-center leading-relaxed">
          <p>{t('cognitiveSwitch.disclaimer')}</p>
        </div>
      </div>
    </div>
  )
}
