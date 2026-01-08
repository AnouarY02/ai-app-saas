import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchTask, updateTask, deleteTask, Task, UpdateTaskRequest } from '../utils/apiClient'
import TaskForm from '../components/TaskForm'

const TaskDetailPage: React.FC = () => {
  const { token } = useAuth()
  const { taskId } = useParams<{ taskId: string }>()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const navigate = useNavigate()

  const loadTask = async () => {
    if (!token || !taskId) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTask(token, taskId)
      setTask(data)
    } catch (e: any) {
      setError(e.message || 'Failed to load task')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTask()
    // eslint-disable-next-line
  }, [token, taskId])

  const handleUpdate = async (data: UpdateTaskRequest) => {
    if (!token || !task) return
    setFormLoading(true)
    try {
      await updateTask(token, task.id, data)
      setEditing(false)
      await loadTask()
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!token || !task) return
    if (!window.confirm('Delete this task?')) return
    try {
      await deleteTask(token, task.id)
      navigate('/tasks')
    } catch (e: any) {
      setError(e.message || 'Failed to delete task')
    }
  }

  if (loading) return <div className="text-center text-gray-500">Loading...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>
  if (!task) return <div className="text-center text-gray-500">Task not found.</div>

  return (
    <div className="max-w-xl mx-auto">
      {editing ? (
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">Edit Task</h2>
          <TaskForm
            initial={task}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
            loading={formLoading}
          />
        </div>
      ) : (
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-700">{task.title}</h2>
          <div className="mb-2 text-gray-600">{task.description || <span className="italic text-gray-400">No description</span>}</div>
          <div className="mb-2">
            <span className="inline-block px-2 py-1 rounded bg-gray-100 text-xs mr-2">Status: {task.status.replace('_', ' ')}</span>
            {task.dueDate && (
              <span className="inline-block px-2 py-1 rounded bg-gray-100 text-xs">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => setEditing(true)}>Edit</button>
            <button className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600" onClick={handleDelete}>Delete</button>
            <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => navigate('/tasks')}>Back</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDetailPage
