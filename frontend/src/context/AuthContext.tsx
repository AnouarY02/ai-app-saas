import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSession, login as apiLogin, signup as apiSignup, logout as apiLogout, UserPublic } from '../utils/apiClient'

interface AuthContextType {
  user: UserPublic | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserPublic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true)
      try {
        const u = await getSession()
        setUser(u)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { user, token } = await apiLogin(email, password)
      localStorage.setItem('token', token)
      setUser(user)
      setLoading(false)
      return true
    } catch (e: any) {
      setError(e.message || 'Login failed')
      setLoading(false)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { user, token } = await apiSignup(name, email, password)
      localStorage.setItem('token', token)
      setUser(user)
      setLoading(false)
      return true
    } catch (e: any) {
      setError(e.message || 'Signup failed')
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    apiLogout()
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
