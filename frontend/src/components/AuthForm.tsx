import React, { useState } from 'react'

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  loading: boolean
  error?: string | null
}

function AuthForm({ onSubmit, loading, error }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!email || !password) return
    await onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 flex flex-col gap-4 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-center mb-2">Sign in to TestApp</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
        />
        {touched && !email && <span className="text-xs text-red-500">Email is required</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input
          id="password"
          type="password"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          autoComplete="current-password"
        />
        {touched && !password && <span className="text-xs text-red-500">Password is required</span>}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
        disabled={loading || !email || !password}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
    </form>
  )
}

export default AuthForm
