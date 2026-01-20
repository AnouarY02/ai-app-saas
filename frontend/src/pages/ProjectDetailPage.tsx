import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject, getBoards, Board, Project } from '../utils/apiClient'
import KanbanBoard from '../components/KanbanBoard'

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!projectId) return
    setLoading(true)
    Promise.all([getProject(projectId), getBoards(projectId)])
      .then(([proj, brds]) => {
        setProject(proj)
        setBoards(brds)
      })
      .catch(() => setError('Failed to load project'))
      .finally(() => setLoading(false))
  }, [projectId])

  if (loading) return <div>Loading...</div>
  if (error || !project) return <div className="text-red-600">{error || 'Project not found'}</div>

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <button
          className="text-blue-600 hover:underline text-sm"
          onClick={() => navigate(`/projects/${project.id}/settings`)}
        >
          Project Settings
        </button>
        <button
          className="text-blue-600 hover:underline text-sm"
          onClick={() => navigate(`/projects/${project.id}/activity`)}
        >
          Activity Feed
        </button>
      </div>
      {boards.length === 0 ? (
        <div>No boards found for this project.</div>
      ) : (
        <KanbanBoard board={boards[0]} />
      )}
    </div>
  )
}

export default ProjectDetailPage
