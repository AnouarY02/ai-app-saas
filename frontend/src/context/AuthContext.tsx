import React, { createContext, useContext, useEffect, useState } from 'react'
import { login as apiLogin, getMe, AuthResponse, UserPublic } from '../utils/apiClient'

interface AuthContextType {
  user: UserPublic | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
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
    getMe(token)
      .then(u => {
        setUser(u)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
        localStorage.removeItem('token')
      })
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res: AuthResponse = await apiLogin(email, password)
      localStorage.setItem('token', res.token)
      setUser(res.user)
      setLoading(false)
    } catch (e: any) {
      setError(e.message || 'Login failed')
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
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
