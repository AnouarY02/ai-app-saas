import React, { createContext, useContext, useState, useEffect } from 'react'
import { getMe, login as apiLogin, logout as apiLogout, UserProfile, AuthResponse } from '../utils/apiClient'

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for token and fetch user on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setLoading(false)
      return
    }
    getMe(token)
      .then((me) => {
        setUser(me)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
        localStorage.removeItem('access_token')
      })
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res: AuthResponse = await apiLogin(email, password)
      localStorage.setItem('access_token', res.access_token)
      setUser(res.user)
      setLoading(false)
      return true
    } catch (err: any) {
      setError(err.message || 'Login failed')
      setUser(null)
      setLoading(false)
      return false
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token')
      if (token) {
        await apiLogout(token)
      }
    } catch {}
    localStorage.removeItem('access_token')
    setUser(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
