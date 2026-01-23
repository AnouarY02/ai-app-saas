import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'

function LoginPage() {
  const { user, login, loading, error } = useAuth()
  const navigate = useNavigate()

  if (user) return <Navigate to="/dashboard" replace />

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password)
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <AuthForm onSubmit={handleLogin} loading={loading} error={error} />
    </div>
  )
}

export default LoginPage
