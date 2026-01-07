import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createContact, updateContact, fetchContact, Contact } from '../utils/apiClient'
import { useAuth } from '../context/AuthContext'

interface ContactFormPageProps {
  mode: 'create' | 'edit'
}

export default function ContactFormPage({ mode }: ContactFormPageProps) {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [form, setForm] = useState<Partial<Contact>>({ name: '', email: '', phone: '', company: '' })
  const [loading, setLoading] = useState(mode === 'edit')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (mode === 'edit' && id) {
      const token = localStorage.getItem('token')
      if (!token) return
      setLoading(true)
      fetchContact(token, id)
        .then(data => setForm(data))
        .catch(() => setError('Failed to load contact'))
        .finally(() => setLoading(false))
    }
  }, [mode, id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name) {
      setError('Name is required')
      return
    }
    setSaving(true)
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      if (mode === 'create') {
        await createContact(token, form)
        navigate('/contacts')
      } else if (mode === 'edit' && id) {
        await updateContact(token, id, form)
        navigate('/contacts')
      }
    } catch {
      setError('Failed to save contact')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-6">{mode === 'create' ? 'New Contact' : 'Edit Contact'}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="name"
            className="border rounded px-3 py-2"
            placeholder="Name *"
            value={form.name || ''}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            className="border rounded px-3 py-2"
            placeholder="Email"
            value={form.email || ''}
            onChange={handleChange}
            type="email"
          />
          <input
            name="phone"
            className="border rounded px-3 py-2"
            placeholder="Phone"
            value={form.phone || ''}
            onChange={handleChange}
          />
          <input
            name="company"
            className="border rounded px-3 py-2"
            placeholder="Company"
            value={form.company || ''}
            onChange={handleChange}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded py-2 px-4 font-semibold hover:bg-blue-700 transition"
              disabled={saving}
            >
              {saving ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 rounded py-2 px-4 hover:bg-gray-300"
              onClick={() => navigate('/contacts')}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
