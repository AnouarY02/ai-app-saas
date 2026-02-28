'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { trackEvent } from '@/lib/analytics'
import { useTranslations } from '@/lib/i18n/context'
import type { DailyCardResponse, ActionRecord } from '@/lib/types'

export default function DashboardPage() {
  const { t } = useTranslations()
  const router = useRouter()
  const [card, setCard] = useState<DailyCardResponse | null>(null)
  const [action, setAction] = useState<ActionRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showMorningCheck, setShowMorningCheck] = useState(false)
  const [showNightCheck, setShowNightCheck] = useState(false)

  const loadDashboard = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('login'); return }

      const today = new Date().toISOString().split('T')[0]

      // Check if card exists for today
      const { data: existingAction } = await supabase
        .from('actions')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      if (existingAction) {
        setAction(existingAction)
        setCard({
          daily_card: {
            primary_action: existingAction.primary_action_json,
            secondary_actions: existingAction.secondary_actions_json,
            micro_education: existingAction.micro_education || '',
            tone: existingAction.tone,
          },
          safety: { flags: [], message: '' },
        })
      } else {
        // Generate new card via API
        const response = await fetch('/api/engine/daily-card', { method: 'POST' })
        if (response.ok) {
          const result = await response.json()
          setCard(result.card)
          setAction(result.action)
        }
      }

      // Calculate streak
      const { data: recentActions } = await supabase
        .from('actions')
        .select('date, completed_primary')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(30)

      if (recentActions) {
        let s = 0
        for (const a of recentActions) {
          if (a.completed_primary) s++
          else break
        }
        setStreak(s)
      }

      // Check if morning check is needed
      const { data: todayLog } = await supabase
        .from('daily_logs')
        .select('energy_morning, bedtime_time')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      if (!todayLog?.energy_morning) {
        const hour = new Date().getHours()
        if (hour >= 5 && hour <= 12) setShowMorningCheck(true)
      }
      if (!todayLog?.bedtime_time) {
        const hour = new Date().getHours()
        if (hour >= 20 || hour <= 2) setShowNightCheck(true)
      }

      trackEvent('daily_card_viewed')
    } catch (err) {
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  async function handleComplete() {
    if (!action) return
    setCompleting(true)
    try {
      const supabase = createClient()
      await supabase
        .from('actions')
        .update({ completed_primary: true })
        .eq('id', action.id)

      setAction({ ...action, completed_primary: true })
      trackEvent('primary_action_completed')
    } finally {
      setCompleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-volt-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-volt-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-bold text-lg">{t('common.appName')}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {streak > 0 && (
              <div className="flex items-center gap-1 text-volt-600 font-medium text-sm">
                <span>&#128293;</span> {t('dashboard.streakDays', { count: streak })}
              </div>
            )}
            <Link href="settings" className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Morning/Night check-in prompts */}
        {showMorningCheck && (
          <Link
            href="checkin/morning"
            className="block bg-volt-50 border border-volt-200 rounded-2xl p-4 transition-all hover:bg-volt-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-volt-800">{t('dashboard.morningGreeting')} &#9728;&#65039;</div>
                <div className="text-sm text-volt-600 mt-0.5">{t('dashboard.morningCheckinCta')}</div>
              </div>
              <span className="text-volt-500">&rarr;</span>
            </div>
          </Link>
        )}

        {showNightCheck && (
          <Link
            href="checkin/night"
            className="block bg-night-50 border border-night-200 rounded-2xl p-4 transition-all hover:bg-night-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-night-800">{t('dashboard.nightGreeting')} &#127769;</div>
                <div className="text-sm text-night-600 mt-0.5">{t('dashboard.nightCheckinCta')}</div>
              </div>
              <span className="text-night-500">&rarr;</span>
            </div>
          </Link>
        )}

        {/* Daily Energy Card */}
        {card && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Card header */}
            <div className="bg-gradient-to-r from-volt-500 to-volt-600 text-white px-6 py-4">
              <div className="text-sm font-medium opacity-90">{t('dashboard.todayFocusOn')}</div>
              <h2 className="text-xl font-bold mt-1">
                {card.daily_card.primary_action.title}
              </h2>
              {card.daily_card.primary_action.minutes > 0 && (
                <div className="text-sm opacity-80 mt-1">
                  ~{card.daily_card.primary_action.minutes} min
                </div>
              )}
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Why */}
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {t('dashboard.whyItWorks')}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {card.daily_card.primary_action.why}
                </p>
              </div>

              {/* How */}
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {t('dashboard.how')}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {card.daily_card.primary_action.how}
                </p>
              </div>

              {/* If-Then */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  {t('dashboard.ifItDoesntWork')}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">{t('dashboard.ifLabel')} </span>
                  <span className="font-medium text-gray-900">
                    {card.daily_card.primary_action.if_then.if}
                  </span>
                </div>
                <div className="text-sm mt-1">
                  <span className="text-gray-500">{t('dashboard.thenLabel')} </span>
                  <span className="font-medium text-volt-700">
                    {card.daily_card.primary_action.if_then.then}
                  </span>
                </div>
              </div>

              {/* Completion button */}
              {action && !action.completed_primary ? (
                <Button
                  onClick={handleComplete}
                  loading={completing}
                  className="w-full"
                >
                  {t('dashboard.markDone')}
                </Button>
              ) : action?.completed_primary ? (
                <div className="text-center py-3 bg-green-50 text-green-700 font-medium rounded-xl">
                  {t('dashboard.completed')}
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* Secondary actions */}
        {card && card.daily_card.secondary_actions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              {t('common.optional')}
            </h3>
            {card.daily_card.secondary_actions.map((sa, i) => (
              <div key={i} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{sa.title}</div>
                    <p className="text-sm text-gray-500 mt-1">{sa.how}</p>
                  </div>
                  {sa.minutes > 0 && (
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                      ~{sa.minutes}m
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Micro education */}
        {card?.daily_card.micro_education && (
          <div className="bg-night-50 rounded-xl p-4 text-sm text-night-800">
            <div className="font-semibold mb-1">&#128161; {t('dashboard.didYouKnow')}</div>
            <p>{card.daily_card.micro_education}</p>
          </div>
        )}

        {/* Safety message */}
        {card?.safety?.message && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
            <div className="font-semibold text-red-800 mb-1">{t('dashboard.important')}</div>
            <p className="text-red-700">{card.safety.message}</p>
            <div className="mt-3 text-xs text-red-600">
              {t('dashboard.safetyHelpline')}
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="progress"
            className="card text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-1">&#128200;</div>
            <div className="text-sm font-medium">{t('dashboard.progress')}</div>
          </Link>
          <Link
            href="paywall"
            className="card text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-1">&#9889;</div>
            <div className="text-sm font-medium">{t('common.premium')}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
