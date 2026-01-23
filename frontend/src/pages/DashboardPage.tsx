import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchTasks, createTask, deleteTask, Task } from '../utils/apiClient'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'

const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  const token = localStorage.getItem('token') || ''

  const loadTasks = async () => {
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
  }, [])

  const handleCreate = async (data: { title: string; description?: string; dueDate?: string }) => {
    setCreating(true)
    try {
      const newTask = await createTask(token, data)
      setTasks(prev => [newTask, ...prev])
    } catch (e: any) {
      setError(e.message || 'Failed to create task')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    const prev = tasks
    setTasks(tasks.filter(t => t.id !== id))
    try {
      await deleteTask(token, id)
    } catch (e: any) {
      setTasks(prev)
      setError(e.message || 'Failed to delete task')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Hello, {user?.name || user?.email}!</h1>
      <TaskForm onSubmit={handleCreate} loading={creating} submitLabel="Add Task" />
      {loading ? (
        <div className="text-center text-gray-500">Loading tasks...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <TaskList tasks={tasks} onDelete={handleDelete} />
      )}
    </div>
  )
}

export default DashboardPage
