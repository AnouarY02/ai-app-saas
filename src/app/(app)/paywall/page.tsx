'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { trackEvent } from '@/lib/analytics'

export default function PaywallPage() {
  const router = useRouter()
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
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
          &larr; Terug
        </Link>
        <div className="w-6" />
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <div className="text-4xl mb-4">&#9889;</div>
          <h1 className="text-3xl font-bold mb-2">VOLT Premium</h1>
          <p className="text-gray-500">
            Ontgrendel de volledige kracht van je energieplan.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-10">
          {[
            {
              title: 'Adaptive Decision Engine',
              desc: 'Je plan wordt slimmer naarmate je meer data invoert. AI-powered personalisatie.',
            },
            {
              title: 'Weekly Energy Report',
              desc: 'Wekelijkse analyse met patronen, trends en impact-schattingen.',
            },
            {
              title: 'Cognitive Switch',
              desc: 'Piekertool voor als je niet kunt slapen. CBT-gebaseerde reframing in 60 sec.',
            },
            {
              title: 'Onbeperkte geschiedenis',
              desc: 'Bekijk al je data en trends, zonder limiet.',
            },
            {
              title: 'Exporteerbare progress cards',
              desc: 'Deel je voortgang als afbeelding op social media.',
            },
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
            Maandelijks
          </button>
          <button
            onClick={() => setPlan('yearly')}
            className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all relative
              ${plan === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            Jaarlijks
            <span className="absolute -top-2 -right-2 bg-volt-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -42%
            </span>
          </button>
        </div>

        {/* Price card */}
        <div className="card-elevated text-center mb-6">
          <div className="text-4xl font-bold mb-1">
            {plan === 'monthly' ? '€9,99' : '€5,75'}
            <span className="text-base font-normal text-gray-400">/maand</span>
          </div>
          {plan === 'yearly' && (
            <div className="text-sm text-gray-500">
              €69 per jaar (i.p.v. €119,88)
            </div>
          )}
        </div>

        <Button onClick={handleSubscribe} loading={loading} className="w-full" size="lg">
          Start Premium
        </Button>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            7 dagen gratis proberen. Annuleer op elk moment.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-xs text-gray-400 text-center leading-relaxed">
          <p>
            VOLT Sleep is geen medisch hulpmiddel. Premium biedt geavanceerde
            gedragsadviezen gebaseerd op evidence-based principes. Bij slaapstoornissen
            adviseren wij contact met een arts.
          </p>
        </div>
      </div>
    </div>
  )
}
