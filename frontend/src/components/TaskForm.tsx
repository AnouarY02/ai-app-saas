import React, { useState } from 'react'
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../utils/apiClient'

interface TaskFormProps {
  initial?: Partial<Task>
  onSubmit: (data: CreateTaskRequest | UpdateTaskRequest) => Promise<void>
  onCancel: () => void
  loading: boolean
}

const TaskForm: React.FC<TaskFormProps> = ({ initial = {}, onSubmit, onCancel, loading }) => {
  const [title, setTitle] = useState(initial.title || '')
  const [description, setDescription] = useState(initial.description || '')
  const [dueDate, setDueDate] = useState(initial.dueDate ? initial.dueDate.slice(0, 10) : '')
  const [status, setStatus] = useState(initial.status || 'pending')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    try {
      await onSubmit({
        title,
        description: description || undefined,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        status: initial.id ? status : undefined,
      })
    } catch (e: any) {
      setError(e.message || 'Failed to save task')
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          disabled={loading}
        />
      </div>
      {initial.id && (
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={status}
            onChange={e => setStatus(e.target.value)}
            disabled={loading}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}
      <div className="flex gap-2 justify-end">
        <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={onCancel} disabled={loading}>Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  )
}

export default TaskForm
