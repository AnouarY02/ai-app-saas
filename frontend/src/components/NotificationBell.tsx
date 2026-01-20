import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '../context/NotificationContext'
import { FaBell } from 'react-icons/fa'

const NotificationBell: React.FC = () => {
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  return (
    <button className="relative" onClick={() => navigate('/notifications')}>
      <FaBell className="text-xl text-blue-600" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
          {unreadCount}
        </span>
      )}
    </button>
  )
}

export default NotificationBell
