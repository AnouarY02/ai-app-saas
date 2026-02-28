'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'
import { useTranslations } from '@/lib/i18n/context'

export default function PaywallPage() {
  const { t } = useTranslations()
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    trackEvent('paywall_viewed')

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 py-4 flex items-center justify-between max-w-lg mx-auto">
        <Link href="dashboard" className="text-gray-400 hover:text-gray-600">
          &larr; {t('common.back')}
        </Link>
        <div className="w-6" />
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <div className="text-4xl mb-4">&#9889;</div>
          <h1 className="text-3xl font-bold mb-2">{t('paywall.title')}</h1>
          <p className="text-gray-500">
            {t('paywall.sub')}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-10">
          {[
            { title: t('paywall.features.engine'), desc: t('paywall.features.engineDesc') },
            { title: t('paywall.features.report'), desc: t('paywall.features.reportDesc') },
            { title: t('paywall.features.switch'), desc: t('paywall.features.switchDesc') },
            { title: t('paywall.features.history'), desc: t('paywall.features.historyDesc') },
            { title: t('paywall.features.export'), desc: t('paywall.features.exportDesc') },
          ].map((feature) => (
            <div key={feature.title} className="flex gap-3">
              <div className="text-volt-500 mt-0.5">&#10003;</div>
              <div>
                <div className="font-medium">{feature.title}</div>
                <div className="text-sm text-gray-500">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setPlan('monthly')}
            className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all
              ${plan === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            {t('paywall.monthly')}
          </button>
          <button
            onClick={() => setPlan('yearly')}
            className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all relative
              ${plan === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            {t('paywall.yearly')}
            <span className="absolute -top-2 -right-2 bg-volt-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -42%
            </span>
          </button>
        </div>

        {/* Price card */}
        <div className="card-elevated text-center mb-6">
          <div className="text-4xl font-bold mb-1">
            {plan === 'monthly' ? t('paywall.monthlyPrice') : t('paywall.yearlyPrice')}
          </div>
          {plan === 'yearly' && (
            <div className="text-sm text-gray-500">
              {t('paywall.yearlySub')}
            </div>
          )}
        </div>

        <Button onClick={handleSubscribe} loading={loading} className="w-full" size="lg">
          {t('paywall.startTrial')}
        </Button>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            {t('paywall.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  )
}
