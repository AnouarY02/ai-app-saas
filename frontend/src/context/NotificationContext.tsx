import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Notification, getNotifications, markNotificationAsRead } from '../utils/apiClient'
import { useAuth } from './AuthContext'

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  refreshNotifications: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  loading: true,
  refreshNotifications: async () => {},
  markAsRead: async () => {},
})

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const data = await getNotifications()
      setNotifications(data)
    } catch {
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchNotifications()
    // Optionally poll every 30s
    const interval = user ? setInterval(fetchNotifications, 30000) : undefined
    return () => { if (interval) clearInterval(interval) }
  }, [user])

  const markAsRead = async (id: string) => {
    await markNotificationAsRead(id)
    await fetchNotifications()
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, loading, refreshNotifications: fetchNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
