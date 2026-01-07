import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

export default function LoginPage() {
  const { login, error, loading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [formError, setFormError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation() as any

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    if (!form.email.trim() || !form.password.trim()) {
      setFormError('Email and password are required')
      return
    }
    const ok = await login(form.email, form.password)
    if (ok) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign in to SaaS CRM</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded px-3 py-2"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            name="password"
            type="password"
            className="w-full border rounded px-3 py-2"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {(formError || error) && <div className="text-red-600 text-sm">{formError || error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
