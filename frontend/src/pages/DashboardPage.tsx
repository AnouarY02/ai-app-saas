import React, { useEffect, useState } from 'react'
import { getProjects, getMetrics, Project, Metric } from '../utils/apiClient'
import AnalyticsDashboard from '../components/AnalyticsDashboard'

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([getProjects(), getMetrics()])
      .then(([proj, met]) => {
        setProjects(proj)
        setMetrics(met)
      })
      .catch(() => setError('Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>
  if (error) return <div className="text-red-600 text-center">{error}</div>

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
              <div className="font-bold text-lg">{p.name}</div>
              <div className="text-gray-600 text-sm">{p.description}</div>
              <div className="text-xs text-gray-400">Created: {new Date(p.createdAt).toLocaleDateString()}</div>
              <a href={`/projects/${p.id}`} className="text-blue-600 hover:underline text-sm mt-2">View Project</a>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Productivity Metrics</h2>
        <AnalyticsDashboard metrics={metrics} />
      </section>
    </div>
  )
}

export default DashboardPage
