import React from 'react'
import { useNotifications } from '../context/NotificationContext'

const NotificationsPage: React.FC = () => {
  const { notifications, loading, markAsRead } = useNotifications()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      {loading ? (
        <div>Loading...</div>
      ) : notifications.length === 0 ? (
        <div>No notifications.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {notifications.map(n => (
            <li
              key={n.id}
              className={`bg-white rounded shadow p-4 flex items-center gap-4 ${n.read ? '' : 'border-l-4 border-blue-600'}`}
            >
              <div className="flex-1">
                <div className="font-semibold">{n.message}</div>
                <div className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
              {!n.read && (
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => markAsRead(n.id)}
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NotificationsPage
