import React, { useEffect, useState } from 'react'
import { getProjects, Project } from '../utils/apiClient'
import { useNavigate } from 'react-router-dom'

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/projects/new')}
          disabled
        >
          + New Project
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <div
              key={p.id}
              className="bg-white rounded shadow p-4 cursor-pointer hover:bg-blue-50"
              onClick={() => navigate(`/projects/${p.id}`)}
            >
              <div className="font-bold text-lg">{p.name}</div>
              <div className="text-gray-600 text-sm">{p.description}</div>
              <div className="text-xs text-gray-400">Created: {new Date(p.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
