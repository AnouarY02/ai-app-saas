'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { DailyLog, ActionRecord, WeeklyReport } from '@/lib/types'

export default function ProgressPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [actions, setActions] = useState<ActionRecord[]>([])
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  const loadProgress = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      // Check plan
      const { data: userData } = await supabase
        .from('users')
        .select('plan')
        .eq('id', user.id)
        .single()
      setIsPremium(userData?.plan === 'premium')

      // Load recent logs (7 days for free, unlimited for premium)
      const limit = userData?.plan === 'premium' ? 30 : 7
      const { data: logsData } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(limit)
      setLogs(logsData || [])

      // Load recent actions
      const { data: actionsData } = await supabase
        .from('actions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(limit)
      setActions(actionsData || [])

      // Load latest weekly report (premium only)
      if (userData?.plan === 'premium') {
        const { data: reportData } = await supabase
          .from('weekly_reports')
          .select('*')
          .eq('user_id', user.id)
          .order('week_start', { ascending: false })
          .limit(1)
          .single()
        if (reportData) {
          setWeeklyReport({
            ...reportData,
            insights: reportData.insights_json,
          })
        }
      }
    } catch (err) {
      console.error('Progress error:', err)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  const completedCount = actions.filter((a) => a.completed_primary).length
  const completionRate = actions.length > 0 ? Math.round((completedCount / actions.length) * 100) : 0
  const avgEnergy = logs.length > 0
    ? (logs.filter((l) => l.energy_morning).reduce((sum, l) => sum + (l.energy_morning || 0), 0) /
       logs.filter((l) => l.energy_morning).length).toFixed(1)
    : '-'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-volt-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
            &larr; Terug
          </Link>
          <h1 className="font-bold text-lg">Voortgang</h1>
          <div className="w-6" />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Stats overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center">
            <div className="text-2xl font-bold text-volt-600">{completionRate}%</div>
            <div className="text-xs text-gray-500 mt-1">Actie rate</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-volt-600">{avgEnergy}</div>
            <div className="text-xs text-gray-500 mt-1">Gem. energie</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-volt-600">{actions.length}</div>
            <div className="text-xs text-gray-500 mt-1">Dagen actief</div>
          </div>
        </div>

        {/* Energy timeline */}
        <div className="card">
          <h3 className="font-semibold mb-4">Energie trend</h3>
          <div className="flex items-end gap-1 h-32">
            {[...logs].reverse().map((log, i) => {
              const energy = log.energy_morning || 0
              const height = (energy / 10) * 100
              const color = energy >= 7 ? 'bg-green-400' : energy >= 4 ? 'bg-yellow-400' : 'bg-red-400'
              return (
                <div key={log.date || i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className={`w-full rounded-t-sm ${color} transition-all`}
                    style={{ height: `${height}%`, minHeight: energy > 0 ? '4px' : '0' }}
                  />
                  <div className="text-[8px] text-gray-400 mt-1 truncate">
                    {new Date(log.date).toLocaleDateString('nl-NL', { weekday: 'short' })}
                  </div>
                </div>
              )
            })}
            {logs.length === 0 && (
              <div className="flex-1 text-center text-gray-400 text-sm py-12">
                Nog geen data. Start met check-ins!
              </div>
            )}
          </div>
        </div>

        {/* Action history */}
        <div className="card">
          <h3 className="font-semibold mb-4">Recente acties</h3>
          <div className="space-y-3">
            {actions.slice(0, 7).map((action) => (
              <div key={action.id} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${action.completed_primary ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {action.completed_primary ? '&#10003;' : '&#8226;'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {action.primary_action_json?.title || 'Actie'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(action.date).toLocaleDateString('nl-NL', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                </div>
              </div>
            ))}
            {actions.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">
                Nog geen acties. Je eerste kaart staat op het dashboard!
              </p>
            )}
          </div>
        </div>

        {/* Weekly report (premium) */}
        {isPremium && weeklyReport ? (
          <div className="card border-2 border-volt-400">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Weekly Energy Report</h3>
              <span className="text-xs font-medium text-volt-600 bg-volt-50 px-2 py-1 rounded-full">
                PREMIUM
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">{weeklyReport.avg_energy ?? '-'}</div>
                <div className="text-xs text-gray-500">Gem. energie</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">{weeklyReport.regularity_score ?? '-'}</div>
                <div className="text-xs text-gray-500">Regulariteit</div>
              </div>
            </div>
            {weeklyReport.insights.map((insight, i) => (
              <div key={i} className="border-t border-gray-100 py-3">
                <div className="font-medium text-sm">{insight.title}</div>
                <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
                <p className="text-xs text-volt-600 mt-1">{insight.impact}</p>
              </div>
            ))}
          </div>
        ) : !isPremium ? (
          <Link href="/paywall" className="block card border-2 border-dashed border-gray-300 text-center">
            <div className="text-2xl mb-2">&#128274;</div>
            <div className="font-semibold mb-1">Weekly Energy Report</div>
            <p className="text-sm text-gray-500 mb-3">
              Ontgrendel wekelijkse inzichten en trends.
            </p>
            <span className="text-volt-600 text-sm font-medium">
              Upgrade naar Premium &rarr;
            </span>
          </Link>
        ) : null}

        {/* No shame streak */}
        <div className="text-center text-xs text-gray-400 py-4">
          Geen schaamte, geen schuld. Elke dag is een nieuwe kans.
        </div>
      </div>
    </div>
  )
}
