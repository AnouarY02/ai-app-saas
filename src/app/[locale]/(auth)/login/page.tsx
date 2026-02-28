'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { useTranslations } from '@/lib/i18n/context'

export default function LoginPage() {
  const { t } = useTranslations()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (authError) {
        setError(authError.message)
        return
      }

      setSent(true)
    } catch {
      setError(t('errors.generic'))
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-volt-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">&#9993;</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{t('auth.checkEmail')}</h1>
          <p className="text-gray-500 mb-6">
            {t('auth.checkEmailSub', { email })}
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-volt-600 font-medium hover:text-volt-700"
          >
            {t('auth.emailPlaceholder')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <Link href="./" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-volt-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold">{t('auth.loginTitle')}</h1>
          <p className="text-gray-500 mt-1">{t('auth.loginSub')}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.emailPlaceholder')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder')}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-volt-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full">
            {t('auth.sendLink')}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {t('auth.noAccount')}{' '}
          <Link href="signup" className="text-volt-600 font-medium hover:text-volt-700">
            {t('auth.signupHere')}
          </Link>
        </p>
      </div>
    </div>
  )
}
