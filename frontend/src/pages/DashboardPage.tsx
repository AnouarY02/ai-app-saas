import React, { useEffect, useState } from 'react'
import { getDashboardMetrics, DashboardMetrics } from '../utils/apiClient'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getDashboardMetrics()
      .then(setMetrics)
      .catch(() => setError('Failed to load metrics'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-12">Loading dashboard...</div>
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>
  if (!metrics) return null

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Contacts</span>
          <span className="text-3xl font-bold text-blue-600">{metrics.totalContacts}</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Deals</span>
          <span className="text-3xl font-bold text-blue-600">{metrics.totalDeals}</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Total Deal Value</span>
          <span className="text-3xl font-bold text-blue-600">${metrics.totalDealValue.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Deals by Stage</span>
          <ul className="mt-2 space-y-1">
            {Object.entries(metrics.dealsByStage).map(([stage, count]) => (
              <li key={stage} className="flex justify-between w-40">
                <span className="capitalize">{stage}</span>
                <span className="font-semibold">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
