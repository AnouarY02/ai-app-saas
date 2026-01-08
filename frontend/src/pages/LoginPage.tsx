import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!email.trim() || !password.trim()) {
      setFormError('Email and password are required')
      return
    }
    try {
      await login(email, password)
      navigate('/tasks')
    } catch (e: any) {
      setFormError(e.message || 'Login failed')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Login</h2>
      {formError && <div className="text-red-500 mb-2">{formError}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </div>
    </div>
  )
}

export default LoginPage
