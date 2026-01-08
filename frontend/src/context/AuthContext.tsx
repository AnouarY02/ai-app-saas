import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginRequest, registerRequest, logoutRequest, getProfile, UserPublic } from '../utils/apiClient'

interface AuthContextType {
  user: UserPublic | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
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

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await loginRequest(email, password)
      setUser(response.user)
      setToken(response.token)
      localStorage.setItem('token', response.token)
    } catch (err: any) {
      setError(err.message || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await registerRequest(email, password, name)
      setUser(response.user)
      setToken(response.token)
      localStorage.setItem('token', response.token)
    } catch (err: any) {
      setError(err.message || 'Registration failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    logoutRequest()
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      getProfile().then(setUser).catch(() => logout())
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
