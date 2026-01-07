import React, { useEffect, useState } from 'react'
import { fetchDashboardMetrics, DashboardMetrics } from '../utils/apiClient'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    fetchDashboardMetrics(token)
      .then(setMetrics)
      .catch(() => setError('Failed to load metrics'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading dashboard...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!metrics) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Welcome, {user?.name || user?.email}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-600">{metrics.totalContacts}</span>
          <span className="text-gray-500">Contacts</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-600">{metrics.totalDeals}</span>
          <span className="text-gray-500">Deals</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-600">${metrics.totalDealValue.toLocaleString()}</span>
          <span className="text-gray-500">Deal Value</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-lg font-bold text-blue-600">Pipeline</span>
          <ul className="mt-2 text-sm">
            {Object.entries(metrics.dealsByStage).map(([stage, count]) => (
              <li key={stage}>{stage}: <span className="font-semibold">{count}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
