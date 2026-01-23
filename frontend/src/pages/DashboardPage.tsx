import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getDashboard, DashboardData } from '../utils/apiClient'

function DashboardPage() {
  const { user } = useAuth()
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setError('Not authenticated')
      setLoading(false)
      return
    }
    getDashboard(token)
      .then((data) => {
        setDashboard(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load dashboard')
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="flex justify-center items-center h-64">Loading dashboard...</div>
  if (error) return <div className="flex justify-center items-center h-64 text-red-600">{error}</div>

  return (
    <section className="max-w-2xl mx-auto mt-10 bg-white rounded shadow p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Welcome, {dashboard?.user.full_name || user?.full_name}!</h2>
      <div className="mb-4">
        <div className="text-gray-700">Email: <span className="font-mono">{dashboard?.user.email}</span></div>
        <div className="text-gray-700">Account status: {dashboard?.user.is_active ? <span className="text-green-600">Active</span> : <span className="text-red-600">Inactive</span>}</div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Stats</h3>
        {dashboard?.stats ? (
          <pre className="bg-slate-100 rounded p-4 text-sm overflow-x-auto">{JSON.stringify(dashboard.stats, null, 2)}</pre>
        ) : (
          <div className="text-gray-500">No stats available.</div>
        )}
      </div>
    </section>
  )
}

export default DashboardPage
