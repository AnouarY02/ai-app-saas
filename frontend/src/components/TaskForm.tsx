import React, { useState } from 'react'
import { Task } from '../utils/apiClient'

interface TaskFormProps {
  initial?: Partial<Task>
  onSubmit: (data: { title: string; description?: string; dueDate?: string; status?: string }) => Promise<void>
  loading?: boolean
  submitLabel?: string
}

const TaskForm: React.FC<TaskFormProps> = ({ initial = {}, onSubmit, loading, submitLabel }) => {
  const [title, setTitle] = useState(initial.title || '')
  const [description, setDescription] = useState(initial.description || '')
  const [dueDate, setDueDate] = useState(initial.dueDate ? initial.dueDate.slice(0, 10) : '')
  const [status, setStatus] = useState(initial.status || 'todo')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    setError(null)
    try {
      await onSubmit({ title, description, dueDate: dueDate || undefined, status })
      setTitle('')
      setDescription('')
      setDueDate('')
      setStatus('todo')
    } catch (e: any) {
      setError(e.message || 'Failed to save task')
    }
  }

  return (
    <form className="flex flex-col gap-3 bg-white rounded shadow p-4 border border-gray-100" onSubmit={handleSubmit}>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <input
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={2}
      />
      <div className="flex gap-2 items-center">
        <input
          type="date"
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {submitLabel || 'Save Task'}
      </button>
    </form>
  )
}

export default TaskForm
