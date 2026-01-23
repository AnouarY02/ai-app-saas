import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getTask, updateTask, deleteTask, Task } from '../utils/apiClient'
import TaskForm from '../components/TaskForm'

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || ''

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getTask(token, id)
      .then(setTask)
      .catch(() => setError('Task not found'))
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [id])

  const handleUpdate = async (data: { title: string; description?: string; dueDate?: string; status?: string }) => {
    if (!id) return
    setSaving(true)
    setError(null)
    try {
      const updated = await updateTask(token, id, data)
      setTask(updated)
    } catch (e: any) {
      setError(e.message || 'Failed to update task')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    try {
      await deleteTask(token, id)
      navigate('/dashboard')
    } catch (e: any) {
      setError(e.message || 'Failed to delete task')
    }
  }

  if (loading) return <div className="text-center text-gray-500">Loading...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>
  if (!task) return null

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Edit Task</h1>
      <TaskForm initial={task} onSubmit={handleUpdate} loading={saving} submitLabel="Update Task" />
      <button
        className="mt-2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition self-start"
        onClick={handleDelete}
      >
        Delete Task
      </button>
    </div>
  )
}

export default TaskDetailPage
