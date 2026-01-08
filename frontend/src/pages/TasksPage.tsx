import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchTasks, createTask, updateTask, deleteTask, Task, CreateTaskRequest, UpdateTaskRequest } from '../utils/apiClient'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'

const TasksPage: React.FC = () => {
  const { token } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  const loadTasks = async () => {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTasks(token)
      setTasks(data)
    } catch (e: any) {
      setError(e.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
    // eslint-disable-next-line
  }, [token])

  const handleCreate = async (data: CreateTaskRequest) => {
    if (!token) return
    setFormLoading(true)
    try {
      await createTask(token, data)
      setShowForm(false)
      await loadTasks()
    } finally {
      setFormLoading(false)
    }
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleUpdate = async (data: UpdateTaskRequest) => {
    if (!token || !editingTask) return
    setFormLoading(true)
    try {
      await updateTask(token, editingTask.id, data)
      setEditingTask(null)
      setShowForm(false)
      await loadTasks()
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (task: Task) => {
    if (!token) return
    if (!window.confirm('Delete this task?')) return
    try {
      await deleteTask(token, task.id)
      await loadTasks()
    } catch (e: any) {
      setError(e.message || 'Failed to delete task')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">My Tasks</h1>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => { setShowForm(true); setEditingTask(null) }}
        >
          + New Task
        </button>
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center mb-4">{error}</div>
      ) : (
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white rounded shadow p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingTask ? 'Edit Task' : 'New Task'}</h2>
            <TaskForm
              initial={editingTask || {}}
              onSubmit={editingTask ? handleUpdate : handleCreate}
              onCancel={handleCancel}
              loading={formLoading}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TasksPage
