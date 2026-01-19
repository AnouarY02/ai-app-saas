import React from 'react'
import { useAuth } from '../context/AuthContext'

const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  return (
    <div className="max-w-2xl mx-auto bg-white rounded shadow p-8">
      <h1 className="text-2xl font-bold mb-2 text-indigo-700">Dashboard</h1>
      <p className="text-gray-700 mb-4">Welcome, <span className="font-semibold">{user?.name || user?.email}</span>!</p>
      <div className="text-gray-500">This is your central hub. Future AI features will appear here.</div>
    </div>
  )
}

export default DashboardPage
