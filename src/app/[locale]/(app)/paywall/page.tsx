'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'
import { useTranslations } from '@/lib/i18n/context'
import { createClient } from '@/lib/supabase/client'
import { assignVariant, PREMIUM_PRO_TIER } from '@/lib/growth/experiments'
import { getPricingForVariant, getTrialDaysRemaining } from '@/lib/growth/conversion'

export default function PaywallPage() {
  const { t } = useTranslations()
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [loading, setLoading] = useState(false)
  const [pricing, setPricing] = useState(getPricingForVariant('9.99'))
  const [trialDays, setTrialDays] = useState<number | null>(null)
  const [showPro, setShowPro] = useState(false)

  useEffect(() => {
    async function loadExperiment() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const variant = assignVariant(user.id, 'pricing_test')
        setPricing(getPricingForVariant(variant))
        trackEvent('experiment_assigned', {
          experiment: 'pricing_test',
          variant,
        })

        // Check trial status
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('status, current_period_end')
          .eq('user_id', user.id)
          .single()
        if (sub) {
          setTrialDays(getTrialDaysRemaining(sub))
        }
      }
    }
    loadExperiment()
    trackEvent('paywall_viewed')

    // Check URL for ?pro=1 to show Premium Pro tier
    const params = new URLSearchParams(window.location.search)
    if (params.get('pro') === '1') {
      setShowPro(true)
    }
  }, [])

  async function handleSubscribe(tier: 'premium' | 'pro' = 'premium') {
    setLoading(true)
    try {
      const priceOverride = tier === 'pro'
        ? (plan === 'monthly' ? PREMIUM_PRO_TIER.monthly : PREMIUM_PRO_TIER.yearly)
        : (plan === 'monthly' ? pricing.monthly : pricing.yearly)

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          price_override: priceOverride,
          tier,
        }),
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
      {/* Trial countdown */}
      {trialDays !== null && trialDays <= 3 && (
        <div className="bg-volt-500 text-white text-center py-2 text-sm font-medium">
          {t('paywall.trialCountdown', { days: trialDays })}
        </div>
      )}

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
              -{pricing.discount}%
            </span>
          </button>
        </div>

        {/* Price card */}
        <div className="card-elevated text-center mb-6">
          <div className="text-4xl font-bold mb-1">
            {plan === 'monthly' ? pricing.monthlyDisplay : pricing.yearlyMonthly}
          </div>
          {plan === 'yearly' && (
            <div className="text-sm text-gray-500">
              {pricing.yearlyDisplay} — {t('paywall.yearlySave', { discount: pricing.discount })}
            </div>
          )}
        </div>

        <Button onClick={() => handleSubscribe('premium')} loading={loading} className="w-full" size="lg">
          {t('paywall.startTrial')}
        </Button>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            {t('paywall.disclaimer')}
          </p>
        </div>

        {/* Premium Pro tier — hidden, unlocked via ?pro=1 */}
        {showPro && (
          <div className="mt-10 border-2 border-volt-400 rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1 bg-volt-100 text-volt-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                PRO
              </div>
              <h2 className="text-2xl font-bold">{t('paywall.proTitle')}</h2>
              <p className="text-sm text-gray-500 mt-1">{t('paywall.proSub')}</p>
            </div>

            <div className="space-y-3 mb-6">
              {PREMIUM_PRO_TIER.features.map((feature) => (
                <div key={feature} className="flex gap-2 text-sm">
                  <span className="text-volt-500">&#10003;</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center mb-4">
              <div className="text-3xl font-bold">
                {plan === 'monthly'
                  ? `\u20ac${PREMIUM_PRO_TIER.monthly}/month`
                  : `\u20ac${PREMIUM_PRO_TIER.yearlyMonthly}/month`}
              </div>
              {plan === 'yearly' && (
                <div className="text-sm text-gray-500">
                  {`\u20ac${PREMIUM_PRO_TIER.yearly}/year — save ${PREMIUM_PRO_TIER.discount}%`}
                </div>
              )}
            </div>

            <Button
              onClick={() => handleSubscribe('pro')}
              loading={loading}
              className="w-full"
              variant="secondary"
              size="lg"
            >
              {t('paywall.proStartTrial')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
