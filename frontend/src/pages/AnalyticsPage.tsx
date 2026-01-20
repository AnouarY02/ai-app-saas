import React, { useEffect, useState } from 'react'
import { getMetrics, Metric } from '../utils/apiClient'
import AnalyticsDashboard from '../components/AnalyticsDashboard'

const AnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getMetrics()
      .then(setMetrics)
      .catch(() => setError('Failed to load metrics'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <AnalyticsDashboard metrics={metrics} />
    </div>
  )
}

export default AnalyticsPage
