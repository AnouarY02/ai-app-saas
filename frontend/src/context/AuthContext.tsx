import React, { createContext, useContext, useState, useEffect } from 'react'
import { getMe, login as apiLogin, logout as apiLogout, UserProfile, LoginRequest } from '../utils/apiClient'

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  error: string | null
  login: (data: LoginRequest) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for token and fetch user on mount
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
      })
  }, [])

  const login = async (data: LoginRequest) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiLogin(data)
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

  const logout = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await apiLogout(token)
      } catch {}
      localStorage.removeItem('token')
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
