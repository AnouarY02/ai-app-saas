'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TimeInput } from '@/components/ui/TimeInput'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { createClient } from '@/lib/supabase/client'
import { trackEvent } from '@/lib/analytics'
import { useTranslations } from '@/lib/i18n/context'
import { getShareText, calculateReferralReward } from '@/lib/growth/referrals'

export default function SettingsPage() {
  const { t, locale } = useTranslations()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [referralCount, setReferralCount] = useState(0)
  const [shareSuccess, setShareSuccess] = useState(false)

  const ROUTE_OPTIONS = [
    { value: 'light', label: t('onboarding.routeLight'), description: t('onboarding.routeLightDesc') },
    { value: 'standard', label: t('onboarding.routeStandard'), description: t('onboarding.routeStandardDesc') },
    { value: 'focus', label: t('onboarding.routeFocus'), description: t('onboarding.routeFocusDesc') },
  ]

  const loadSettings = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('login'); return }

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()
      setUser(userData)
      setReferralCode(userData?.referral_code || null)

      const { data: profileData } = await supabase
        .from('onboarding_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single()
      setProfile(profileData)

      // Load referral count
      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', authUser.id)
        .eq('status', 'converted')
      setReferralCount(count || 0)
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

      router.push('dashboard')
    } finally {
      setSaving(false)
    }
  }

  async function handleShare() {
    if (!referralCode) return
    const share = getShareText(locale, referralCode)

    if (navigator.share) {
      try {
        await navigator.share({
          title: share.title,
          text: share.text,
          url: share.url,
        })
        trackEvent('referral_shared', { method: 'native' })
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 3000)
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${share.text}\n${share.url}`)
      trackEvent('referral_shared', { method: 'clipboard' })
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 3000)
    }
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('./')
  }

  async function handleDeleteAccount() {
    if (!confirm(t('settings.deleteConfirm'))) {
      return
    }
    const supabase = createClient()
    await fetch('/api/account/delete', { method: 'POST' })
    await supabase.auth.signOut()
    router.push('./')
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-volt-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const reward = calculateReferralReward(referralCount)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="dashboard" className="text-gray-400 hover:text-gray-600">
            &larr; {t('common.back')}
          </Link>
          <h1 className="font-bold text-lg">{t('settings.title')}</h1>
          <div className="w-6" />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Plan info */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{t('settings.plan')}</div>
              <div className="text-sm text-gray-500 capitalize">{user?.plan || t('common.free').toLowerCase()}</div>
            </div>
            {user?.plan !== 'premium' && (
              <Link href="paywall" className="text-sm text-volt-600 font-medium">
                {t('settings.upgradeLink')}
              </Link>
            )}
          </div>
        </div>

        {/* Referral section */}
        {referralCode && (
          <div className="card space-y-4">
            <h3 className="font-semibold">{t('settings.referralTitle')}</h3>
            <p className="text-sm text-gray-500">{t('settings.referralDesc')}</p>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {t('settings.referralCount', { count: referralCount })}
                  </div>
                  {reward.earnedDays > 0 && (
                    <div className="text-xs text-volt-600 mt-1">
                      {t('settings.referralEarned', { days: reward.earnedDays })}
                    </div>
                  )}
                  {reward.nextMilestone && (
                    <div className="text-xs text-gray-400 mt-1">
                      {t('settings.referralNext', {
                        referrals: reward.nextMilestone.referrals,
                        reward: reward.nextMilestone.reward,
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button onClick={handleShare} variant="ghost" className="w-full">
              {shareSuccess ? t('settings.referralCopied') : t('settings.referralShare')}
            </Button>
          </div>
        )}

        {/* Wake targets */}
        <div className="card space-y-4">
          <h3 className="font-semibold">{t('settings.wakeTimes')}</h3>
          <TimeInput
            label={t('settings.weekdayLabel')}
            value={profile.wake_target_weekday}
            onChange={(v) => setProfile({ ...profile, wake_target_weekday: v })}
          />
          <TimeInput
            label={t('settings.weekendLabel')}
            value={profile.wake_target_weekend}
            onChange={(v) => setProfile({ ...profile, wake_target_weekend: v })}
          />
        </div>

        {/* Route */}
        <div className="card">
          <ToggleGroup
            label={t('settings.intensityLabel')}
            options={ROUTE_OPTIONS}
            value={profile.start_route}
            onChange={(v) => setProfile({ ...profile, start_route: v })}
          />
        </div>

        <Button onClick={handleSave} loading={saving} className="w-full">
          {t('common.save')}
        </Button>

        {/* Account actions */}
        <div className="space-y-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2"
          >
            {t('common.logout')}
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full text-left text-sm text-red-500 hover:text-red-700 py-2"
          >
            {t('settings.deleteAccount')}
          </button>
        </div>

        {/* Disclaimers */}
        <div className="text-xs text-gray-400 leading-relaxed">
          <p className="mb-2">
            {t('settings.disclaimerText')}
          </p>
          <p>
            <Link href="privacy" className="underline">{t('landing.footer.privacy')}</Link>
            {' · '}
            <Link href="terms" className="underline">{t('landing.footer.terms')}</Link>
            {' · '}
            <a href="mailto:support@voltsleep.nl" className="underline">{t('landing.footer.contact')}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
