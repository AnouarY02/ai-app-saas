import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const { register, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setLoading(true)
    const ok = await register(email, password, name)
    setLoading(false)
    if (ok) {
      navigate('/dashboard')
    } else {
      setFormError('Registration failed')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {(formError || error) && <div className="text-red-500 text-sm">{formError || error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </div>
    </div>
  )
}

export default RegisterPage
