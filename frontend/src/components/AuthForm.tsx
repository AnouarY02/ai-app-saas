import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

interface AuthFormProps {
  mode: 'login' | 'signup'
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { login, signup, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    try {
      if (mode === 'login') {
        await login(email, password)
        navigate('/dashboard')
      } else {
        await signup(email, password, name)
        navigate('/dashboard')
      }
    } catch (err: any) {
      setFormError(err.message || 'Authentication failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-8 w-full max-w-md flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      {mode === 'signup' && (
        <input
          type="text"
          placeholder="Name (optional)"
          className="border rounded px-3 py-2"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="border rounded px-3 py-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded px-3 py-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {(formError || error) && (
        <div className="text-red-600 text-sm">{formError || error}</div>
      )}
      <button
        type="submit"
        className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? <LoadingSpinner size={20} /> : mode === 'login' ? 'Login' : 'Sign Up'}
      </button>
      <div className="text-center text-sm text-gray-500 mt-2">
        {mode === 'login' ? (
          <>Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link></>
        ) : (
          <>Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link></>
        )}
      </div>
    </form>
  )
}

export default AuthForm
