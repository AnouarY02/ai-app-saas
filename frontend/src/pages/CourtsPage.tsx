import React, { useEffect, useState } from 'react'
import { getCourts, createCourt, updateCourt, deleteCourt, Court } from '../utils/apiClient'
import CourtList from '../components/CourtList'
import { useAuth } from '../context/AuthContext'

export default function CourtsPage() {
  const { user } = useAuth()
  const [courts, setCourts] = useState<Court[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<{ id?: string; name: string; location?: string; surfaceType?: string }>({ name: '', location: '', surfaceType: '' })
  const [formError, setFormError] = useState<string | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const c = await getCourts()
        setCourts(c)
      } catch (e: any) {
        setError(e.message || 'Failed to load courts')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleEdit = (court: Court) => {
    setForm({ id: court.id, name: court.name, location: court.location, surfaceType: court.surfaceType })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this court?')) return
    try {
      await deleteCourt(id)
      setCourts(courts => courts.filter(c => c.id !== id))
    } catch (e: any) {
      alert(e.message || 'Failed to delete court')
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!form.name) {
      setFormError('Court name required')
      return
    }
    setFormLoading(true)
    try {
      if (form.id) {
        const updated = await updateCourt(form.id, {
          name: form.name,
          location: form.location,
          surfaceType: form.surfaceType
        })
        setCourts(cs => cs.map(c => (c.id === updated.id ? updated : c)))
      } else {
        const created = await createCourt({
          name: form.name,
          location: form.location,
          surfaceType: form.surfaceType
        })
        setCourts(cs => [created, ...cs])
      }
      setShowForm(false)
      setForm({ name: '', location: '', surfaceType: '' })
    } catch (e: any) {
      setFormError(e.message || 'Failed to save court')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Courts</h1>
        {user?.role === 'admin' && (
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
            onClick={() => {
              setShowForm(f => !f)
              setForm({ name: '', location: '', surfaceType: '' })
            }}
          >
            {showForm ? 'Close' : 'Add Court'}
          </button>
        )}
      </div>
      {showForm && (
        <form className="bg-white rounded shadow p-6 flex flex-col gap-4 max-w-lg" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Court Name</label>
            <input
              type="text"
              name="name"
              className="border rounded px-3 py-2"
              value={form.name}
              onChange={handleFormChange}
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Location</label>
            <input
              type="text"
              name="location"
              className="border rounded px-3 py-2"
              value={form.location || ''}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Surface Type</label>
            <input
              type="text"
              name="surfaceType"
              className="border rounded px-3 py-2"
              value={form.surfaceType || ''}
              onChange={handleFormChange}
            />
          </div>
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            type="submit"
            disabled={formLoading}
          >
            {formLoading ? 'Saving...' : form.id ? 'Update Court' : 'Add Court'}
          </button>
        </form>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : courts.length === 0 ? (
        <div className="text-gray-500">No courts available.</div>
      ) : (
        <CourtList courts={courts} onEdit={user?.role === 'admin' ? handleEdit : undefined} onDelete={user?.role === 'admin' ? handleDelete : undefined} />
      )}
    </div>
  )
}
