import React from 'react'
import { Metric } from '../utils/apiClient'

interface AnalyticsDashboardProps {
  metrics: Metric[]
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ metrics }) => {
  if (!metrics.length) return <div>No metrics available.</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map(m => (
        <div key={m.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
          <div className="font-bold text-lg">{m.type.replace(/_/g, ' ').toUpperCase()}</div>
          <div className="text-2xl text-blue-700 font-bold">{m.value}</div>
          <div className="text-xs text-gray-400">Period: {m.period}</div>
        </div>
      ))}
    </div>
  )
}

export default AnalyticsDashboard
