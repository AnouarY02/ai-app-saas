import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const { login, error, loading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [formError, setFormError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    try {
      await login(form)
      navigate('/')
    } catch (e: any) {
      setFormError(e.message || 'Login failed')
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="border rounded px-3 py-2"
        />
        {(formError || error) && <div className="text-red-600 text-sm">{formError || error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
      </div>
    </div>
  )
}
