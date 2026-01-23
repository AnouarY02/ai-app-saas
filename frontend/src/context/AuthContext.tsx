import React, { createContext, useContext, useState, useEffect } from 'react'
import { getProfile, login, register, logout as apiLogout, UserPublic, AuthResponse } from '../utils/apiClient'

interface AuthContextType {
  user: UserPublic | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name?: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserPublic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }
    getProfile(token)
      .then(u => setUser(u))
      .catch(() => {
        setUser(null)
        localStorage.removeItem('token')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res: AuthResponse = await login(email, password)
      localStorage.setItem('token', res.token)
      setUser(res.user)
      setLoading(false)
      return true
    } catch (e: any) {
      setError(e.message || 'Login failed')
      setLoading(false)
      return false
    }
  }

  const handleRegister = async (email: string, password: string, name?: string) => {
    setLoading(true)
    setError(null)
    try {
      const res: AuthResponse = await register(email, password, name)
      localStorage.setItem('token', res.token)
      setUser(res.user)
      setLoading(false)
      return true
    } catch (e: any) {
      setError(e.message || 'Registration failed')
      setLoading(false)
      return false
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (token) await apiLogout(token)
    } catch {}
    localStorage.removeItem('token')
    setUser(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login: handleLogin, register: handleRegister, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
