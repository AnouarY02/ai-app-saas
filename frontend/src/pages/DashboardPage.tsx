import React from 'react'
import { useAuth } from '../context/AuthContext'

const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to Padel Club Pro!</h2>
      <div className="bg-white rounded shadow p-6">
        <p className="text-gray-700 mb-2">You are logged in as <span className="font-semibold">{user?.email}</span>.</p>
        <p className="text-gray-500 text-sm">Last login: {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'N/A'}</p>
      </div>
    </div>
  )
}

export default DashboardPage
