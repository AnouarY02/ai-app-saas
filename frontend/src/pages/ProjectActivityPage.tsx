import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectActivity, Activity } from '../utils/apiClient'
import ActivityFeed from '../components/ActivityFeed'

const ProjectActivityPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [activity, setActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!projectId) return
    setLoading(true)
    getProjectActivity(projectId)
      .then(setActivity)
      .catch(() => setError('Failed to load activity'))
      .finally(() => setLoading(false))
  }, [projectId])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Project Activity</h1>
      <ActivityFeed activity={activity} />
    </div>
  )
}

export default ProjectActivityPage
