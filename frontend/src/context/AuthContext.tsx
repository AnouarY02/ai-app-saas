// No authentication required for this app.
// This file is provided for future extensibility.

import React, { createContext } from 'react'

export interface AuthContextType {}

export const AuthContext = createContext<AuthContextType>({})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

// Export useAuth hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
