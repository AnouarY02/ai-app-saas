import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, AuthResponse } from '../utils/apiClient'
import { getMe, login as apiLogin, signup as apiSignup, logout as apiLogout } from '../utils/apiClient'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Try to fetch current user on mount
    (async () => {
      try {
        setLoading(true)
        const me = await getMe()
        setUser(me)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiLogin({ email, password })
      setUser(res.user)
      localStorage.setItem('token', res.token)
    } catch (err: any) {
      setError(err.message || 'Login failed')
      setUser(null)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, name?: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiSignup({ email, password, name })
      setUser(res.user)
      localStorage.setItem('token', res.token)
    } catch (err: any) {
      setError(err.message || 'Signup failed')
      setUser(null)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      if (token) {
        await apiLogout(token)
      }
      setUser(null)
      localStorage.removeItem('token')
    } catch (err: any) {
      setError(err.message || 'Logout failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
