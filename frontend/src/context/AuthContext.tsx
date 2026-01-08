import React, { createContext, useContext } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false })

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // No authentication in this app, always false
  return (
    <AuthContext.Provider value={{ isAuthenticated: false }}>
      {children}
    </AuthContext.Provider>
  )
}
