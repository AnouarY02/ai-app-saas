import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, getCurrentUser, updateCurrentUser } from '../utils/apiClient'
import { useAuth } from './AuthContext'

interface UserContextType {
  user: User | null
  updateUser: (data: Partial<User>) => Promise<void>
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: async () => {},
  refreshUser: async () => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user: authUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(authUser)
  }, [authUser])

  const updateUser = async (data: Partial<User>) => {
    const updated = await updateCurrentUser(data)
    setUser(updated)
  }

  const refreshUser = async () => {
    const u = await getCurrentUser()
    setUser(u)
  }

  return (
    <UserContext.Provider value={{ user, updateUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
