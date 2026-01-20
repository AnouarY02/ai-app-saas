import React, { useState } from 'react'
import { WorkoutCreateRequest, createWorkout } from '../utils/apiClient'

interface WorkoutFormProps {
  onCreated: () => void
}

export default function WorkoutForm({ onCreated }: WorkoutFormProps) {
  const [form, setForm] = useState<WorkoutCreateRequest>({
    date: '',
    type: '',
    duration_minutes: 0,
    calories_burned: 0,
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'duration_minutes' || name === 'calories_burned' ? Number(value) : value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await createWorkout(form)
      setForm({ date: '', type: '', duration_minutes: 0, calories_burned: 0, notes: '' })
      onCreated()
    } catch (e: any) {
      setError(e.message || 'Failed to add workout')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 flex flex-col gap-3">
      <div className="font-semibold mb-1">Add Workout</div>
      <div className="flex gap-2">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1 flex-1"
        />
        <input
          type="text"
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type (e.g. Running)"
          required
          className="border rounded px-2 py-1 flex-1"
        />
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          name="duration_minutes"
          value={form.duration_minutes}
          onChange={handleChange}
          placeholder="Duration (min)"
          min={1}
          required
          className="border rounded px-2 py-1 flex-1"
        />
        <input
          type="number"
          name="calories_burned"
          value={form.calories_burned}
          onChange={handleChange}
          placeholder="Calories"
          min={0}
          required
          className="border rounded px-2 py-1 flex-1"
        />
      </div>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes (optional)"
        className="border rounded px-2 py-1"
        rows={2}
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Workout'}
      </button>
    </form>
  )
}
