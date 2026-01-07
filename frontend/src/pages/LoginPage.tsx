import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, error, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (!email || !password) {
      setFormError('Email and password are required')
      return
    }
    try {
      await login(email, password)
      navigate('/')
    } catch {
      // error handled in context
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign in to SaaS CRM</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          className="border rounded px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          className="border rounded px-3 py-2"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {(formError || error) && (
          <div className="text-red-500 text-sm">{formError || error}</div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
