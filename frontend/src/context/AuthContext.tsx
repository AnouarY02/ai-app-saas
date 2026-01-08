import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, AuthResponse, UserPublic } from '../utils/apiClient'

interface AuthContextType {
  user: UserPublic | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserPublic | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res: AuthResponse = await loginUser({ email, password })
      setToken(res.token)
      setUser(res.user)
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
    } catch (e: any) {
      setError(e.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res: AuthResponse = await registerUser({ email, password })
      setToken(res.token)
      setUser(res.user)
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
    } catch (e: any) {
      setError(e.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
