'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TimeInput } from '@/components/ui/TimeInput'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { createClient } from '@/lib/supabase/client'

const ROUTE_OPTIONS = [
  { value: 'light', label: 'Light', description: '1 actie per dag.' },
  { value: 'standard', label: 'Standard', description: '1-2 acties per dag.' },
  { value: 'focus', label: 'Focus', description: '2-3 acties per dag.' },
]

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  const loadSettings = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('/login'); return }

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()
      setUser(userData)

      const { data: profileData } = await supabase
        .from('onboarding_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single()
      setProfile(profileData)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  async function handleSave() {
    if (!profile) return
    setSaving(true)
    try {
      const supabase = createClient()
      await supabase
        .from('onboarding_profiles')
        .update({
          wake_target_weekday: profile.wake_target_weekday,
          wake_target_weekend: profile.wake_target_weekend,
          start_route: profile.start_route,
        })
        .eq('user_id', profile.user_id)

      router.push('/dashboard')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  async function handleDeleteAccount() {
    if (!confirm('Weet je zeker dat je je account wilt verwijderen? Dit kan niet ongedaan worden.')) {
      return
    }
    const supabase = createClient()
    // Request deletion through API (GDPR)
    await fetch('/api/account/delete', { method: 'POST' })
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading || !profile) {
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
          <h1 className="font-bold text-lg">Instellingen</h1>
          <div className="w-6" />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Plan info */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Plan</div>
              <div className="text-sm text-gray-500 capitalize">{user?.plan || 'free'}</div>
            </div>
            {user?.plan !== 'premium' && (
              <Link href="/paywall" className="text-sm text-volt-600 font-medium">
                Upgrade &rarr;
              </Link>
            )}
          </div>
        </div>

        {/* Wake targets */}
        <div className="card space-y-4">
          <h3 className="font-semibold">Opstaantijden</h3>
          <TimeInput
            label="Werkdagen"
            value={profile.wake_target_weekday}
            onChange={(v) => setProfile({ ...profile, wake_target_weekday: v })}
          />
          <TimeInput
            label="Weekend"
            value={profile.wake_target_weekend}
            onChange={(v) => setProfile({ ...profile, wake_target_weekend: v })}
          />
        </div>

        {/* Route */}
        <div className="card">
          <ToggleGroup
            label="Intensiteit"
            options={ROUTE_OPTIONS}
            value={profile.start_route}
            onChange={(v) => setProfile({ ...profile, start_route: v })}
          />
        </div>

        <Button onClick={handleSave} loading={saving} className="w-full">
          Opslaan
        </Button>

        {/* Account actions */}
        <div className="space-y-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2"
          >
            Uitloggen
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full text-left text-sm text-red-500 hover:text-red-700 py-2"
          >
            Account verwijderen (GDPR)
          </button>
        </div>

        {/* Disclaimers */}
        <div className="text-xs text-gray-400 leading-relaxed">
          <p className="mb-2">
            VOLT Sleep is geen medisch hulpmiddel en biedt geen diagnose of behandeling.
            Bij ernstige slaapproblemen adviseren wij contact met je huisarts.
          </p>
          <p>
            <Link href="/privacy" className="underline">Privacybeleid</Link>
            {' · '}
            <Link href="/terms" className="underline">Voorwaarden</Link>
            {' · '}
            <a href="mailto:support@voltsleep.nl" className="underline">Contact</a>
          </p>
        </div>
      </div>
    </div>
  )
}
