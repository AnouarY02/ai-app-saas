'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { trackEvent } from '@/lib/analytics'
import { useTranslations } from '@/lib/i18n/context'
import { calculateStreak, detectMicroWin, calculateMomentum } from '@/lib/growth/streaks'
import { checkConversionTrigger, getTrialDaysRemaining } from '@/lib/growth/conversion'
import { checkActivation } from '@/lib/growth/activation'
import type { DailyCardResponse, ActionRecord } from '@/lib/types'

export default function DashboardPage() {
  const { t } = useTranslations()
  const router = useRouter()
  const [card, setCard] = useState<DailyCardResponse | null>(null)
  const [action, setAction] = useState<ActionRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [streak, setStreak] = useState(0)
  const [streakStatus, setStreakStatus] = useState<'active' | 'at_risk' | 'broken'>('broken')
  const [showMorningCheck, setShowMorningCheck] = useState(false)
  const [showNightCheck, setShowNightCheck] = useState(false)
  const [microWin, setMicroWin] = useState<{ improved: boolean; delta: number } | null>(null)
  const [momentum, setMomentum] = useState<{ score: number; trend: 'up' | 'down' | 'stable' }>({ score: 0, trend: 'stable' })
  const [conversionTrigger, setConversionTrigger] = useState<{ shouldTrigger: boolean; message?: string } | null>(null)
  const [trialDays, setTrialDays] = useState<number | null>(null)
  const [isPremium, setIsPremium] = useState(false)

  const loadDashboard = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('login'); return }

      const today = new Date().toISOString().split('T')[0]

      // Load user data
      const { data: userData } = await supabase
        .from('users')
        .select('plan')
        .eq('id', user.id)
        .single()
      const userIsPremium = userData?.plan === 'premium'
      setIsPremium(userIsPremium)

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

      // Load recent actions for streak + momentum
      const { data: recentActions } = await supabase
        .from('actions')
        .select('date, completed_primary')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(30)

      if (recentActions) {
        // Streak calculation (forgiving)
        const streakData = calculateStreak(recentActions)
        setStreak(streakData.current)
        setStreakStatus(streakData.status)

        // Momentum
        const momentumData = calculateMomentum(recentActions)
        setMomentum(momentumData)

        // Conversion trigger (free users only)
        if (!userIsPremium) {
          const completedCards = recentActions.filter((a) => a.completed_primary).length
          // Load energy logs for delta
          const { data: recentLogs } = await supabase
            .from('daily_logs')
            .select('energy_morning, date')
            .eq('user_id', user.id)
            .order('date', { ascending: false })
            .limit(14)

          const win = detectMicroWin(recentLogs || [])
          setMicroWin(win)

          const trigger = checkConversionTrigger(completedCards, win.delta, false)
          if (trigger.shouldTrigger) {
            setConversionTrigger(trigger)
            trackEvent('conversion_trigger', { reason: trigger.reason })
          }
        } else {
          // Premium: detect micro wins
          const { data: recentLogs } = await supabase
            .from('daily_logs')
            .select('energy_morning, date')
            .eq('user_id', user.id)
            .order('date', { ascending: false })
            .limit(14)
          const win = detectMicroWin(recentLogs || [])
          setMicroWin(win)
        }

        // Streak milestone tracking
        if (streakData.current > 0 && streakData.current % 7 === 0) {
          trackEvent('streak_milestone', { days: streakData.current })
        }
      }

      // Trial countdown
      if (userIsPremium) {
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('status, current_period_end')
          .eq('user_id', user.id)
          .single()
        if (sub) {
          const days = getTrialDaysRemaining(sub)
          setTrialDays(days)
        }
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

      // Check activation
      await checkActivation(supabase, user.id)
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

      // Check activation after action completion
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const result = await checkActivation(supabase, user.id)
        if (result.activated) {
          trackEvent('user_activated')
        }
      }
    } finally {
      setCompleting(false)
    }
  }

  const trendArrow = momentum.trend === 'up' ? '\u2197' : momentum.trend === 'down' ? '\u2198' : '\u2192'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-volt-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Trial countdown banner */}
      {trialDays !== null && trialDays <= 3 && (
        <div className="bg-volt-500 text-white text-center py-2 text-sm font-medium">
          {t('dashboard.trialCountdown', { days: trialDays })}
        </div>
      )}

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
              <div className={`flex items-center gap-1 font-medium text-sm ${
                streakStatus === 'at_risk' ? 'text-orange-500' : 'text-volt-600'
              }`}>
                <span>&#128293;</span> {t('dashboard.streakDays', { count: streak })}
                {streakStatus === 'at_risk' && (
                  <span className="text-xs text-orange-400 ml-1">{t('dashboard.streakAtRisk')}</span>
                )}
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
        {/* Micro Win celebration */}
        {microWin?.improved && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center animate-in fade-in">
            <div className="text-2xl mb-1">&#127881;</div>
            <div className="font-semibold text-green-800">{t('dashboard.microWinTitle')}</div>
            <div className="text-sm text-green-600 mt-1">
              {t('dashboard.microWinDesc', { delta: microWin.delta.toFixed(1) })}
            </div>
          </div>
        )}

        {/* Streak at risk nudge */}
        {streakStatus === 'at_risk' && streak > 0 && !action?.completed_primary && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">&#128293;</span>
              <div>
                <div className="font-medium text-orange-800 text-sm">{t('dashboard.streakAtRiskTitle')}</div>
                <div className="text-xs text-orange-600">{t('dashboard.streakAtRiskDesc', { count: streak })}</div>
              </div>
            </div>
          </div>
        )}

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

        {/* Habit Momentum indicator */}
        {momentum.score > 0 && (
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">{t('dashboard.momentum')}</div>
              <div className="flex items-center gap-2">
                <span className={`text-lg ${
                  momentum.trend === 'up' ? 'text-green-500' : momentum.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {trendArrow}
                </span>
                <span className="text-sm text-gray-500">{t(`dashboard.trend.${momentum.trend}`)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Micro education */}
        {card?.daily_card.micro_education && (
          <div className="bg-night-50 rounded-xl p-4 text-sm text-night-800">
            <div className="font-semibold mb-1">&#128161; {t('dashboard.didYouKnow')}</div>
            <p>{card.daily_card.micro_education}</p>
          </div>
        )}

        {/* Premium Tease: Blurred Weekly Insight preview (free users only) */}
        {!isPremium && (
          <Link href="paywall" className="block relative overflow-hidden rounded-2xl border border-gray-200">
            <div className="bg-gradient-to-b from-volt-50 to-white p-5 blur-[2px] select-none pointer-events-none">
              <div className="font-semibold text-gray-800 mb-2">{t('progress.weeklyReport')}</div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded-full w-3/4" />
                <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                <div className="h-3 bg-volt-200 rounded-full w-2/3" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <div className="text-center">
                <div className="text-lg mb-1">&#128274;</div>
                <div className="font-semibold text-sm text-gray-900">{t('dashboard.unlockInsights')}</div>
                <div className="text-xs text-volt-600 mt-1">{t('dashboard.unlockCta')}</div>
              </div>
            </div>
          </Link>
        )}

        {/* Conversion trigger banner (free users only) */}
        {conversionTrigger?.shouldTrigger && !isPremium && (
          <Link href="paywall" className="block bg-volt-50 border border-volt-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">&#9889;</div>
              <div>
                <div className="font-medium text-volt-800 text-sm">{conversionTrigger.message}</div>
                <div className="text-xs text-volt-600 mt-0.5">{t('dashboard.tryPremium')}</div>
              </div>
            </div>
          </Link>
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
