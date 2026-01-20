import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, loginUser, signupUser, logoutUser, User, UserLoginRequest, UserSignupRequest } from '../utils/apiClient'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (data: UserLoginRequest) => Promise<void>
  signup: (data: UserSignupRequest) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function refresh() {
    setLoading(true)
    try {
      const user = await getCurrentUser()
      setUser(user)
      setError(null)
    } catch (e) {
      setUser(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line
  }, [])

  async function login(data: UserLoginRequest) {
    setLoading(true)
    setError(null)
    try {
      const { token } = await loginUser(data)
      localStorage.setItem('token', token)
      await refresh()
    } catch (e: any) {
      setError(e.message || 'Login failed')
      setUser(null)
    }
    setLoading(false)
  }

  async function signup(data: UserSignupRequest) {
    setLoading(true)
    setError(null)
    try {
      const { token } = await signupUser(data)
      localStorage.setItem('token', token)
      await refresh()
    } catch (e: any) {
      setError(e.message || 'Signup failed')
      setUser(null)
    }
    setLoading(false)
  }

  async function logout() {
    setLoading(true)
    try {
      await logoutUser()
    } catch {}
    localStorage.removeItem('token')
    setUser(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
