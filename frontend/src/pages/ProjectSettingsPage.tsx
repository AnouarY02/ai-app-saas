import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProject, updateProject, Project } from '../utils/apiClient'

const ProjectSettingsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!projectId) return
    setLoading(true)
    getProject(projectId)
      .then(proj => {
        setProject(proj)
        setName(proj.name)
        setDescription(proj.description)
      })
      .catch(() => setError('Failed to load project'))
      .finally(() => setLoading(false))
  }, [projectId])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectId) return
    setSaving(true)
    setError(null)
    setSuccess(false)
    try {
      await updateProject(projectId, { name, description })
      setSuccess(true)
    } catch {
      setError('Failed to update project')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error || !project) return <div className="text-red-600">{error || 'Project not found'}</div>

  return (
    <form className="max-w-lg bg-white rounded shadow p-6 flex flex-col gap-4" onSubmit={handleSave}>
      <h2 className="text-xl font-bold mb-2">Project Settings</h2>
      <label className="font-semibold">Name</label>
      <input
        className="border rounded px-3 py-2"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label className="font-semibold">Description</label>
      <textarea
        className="border rounded px-3 py-2"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="submit"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      {success && <div className="text-green-600">Project updated!</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  )
}

export default ProjectSettingsPage
