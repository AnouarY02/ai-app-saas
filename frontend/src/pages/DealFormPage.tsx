import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createDeal, updateDeal, fetchDeal, fetchContacts, Deal, Contact } from '../utils/apiClient'
import { useAuth } from '../context/AuthContext'

interface DealFormPageProps {
  mode: 'create' | 'edit'
}

const stages = ['new', 'qualified', 'won', 'lost']

export default function DealFormPage({ mode }: DealFormPageProps) {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [form, setForm] = useState<Partial<Deal>>({ title: '', value: 0, stage: 'new', contactId: '' })
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(mode === 'edit')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    fetchContacts(token).then(res => setContacts(res.items)).catch(() => {})
    if (mode === 'edit' && id) {
      setLoading(true)
      fetchDeal(token, id)
        .then(data => setForm(data))
        .catch(() => setError('Failed to load deal'))
        .finally(() => setLoading(false))
    }
  }, [mode, id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.title || !form.value || !form.stage) {
      setError('Title, value, and stage are required')
      return
    }
    setSaving(true)
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      if (mode === 'create') {
        await createDeal(token, { ...form, value: Number(form.value) })
        navigate('/deals')
      } else if (mode === 'edit' && id) {
        await updateDeal(token, id, { ...form, value: Number(form.value) })
        navigate('/deals')
      }
    } catch {
      setError('Failed to save deal')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-6">{mode === 'create' ? 'New Deal' : 'Edit Deal'}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="title"
            className="border rounded px-3 py-2"
            placeholder="Title *"
            value={form.title || ''}
            onChange={handleChange}
            required
          />
          <input
            name="value"
            className="border rounded px-3 py-2"
            placeholder="Value *"
            type="number"
            value={form.value || ''}
            onChange={handleChange}
            required
          />
          <select
            name="stage"
            className="border rounded px-3 py-2"
            value={form.stage || 'new'}
            onChange={handleChange}
            required
          >
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          <select
            name="contactId"
            className="border rounded px-3 py-2"
            value={form.contactId || ''}
            onChange={handleChange}
          >
            <option value="">-- Link to Contact (optional) --</option>
            {contacts.map(contact => (
              <option key={contact.id} value={contact.id}>{contact.name}</option>
            ))}
          </select>
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
              onClick={() => navigate('/deals')}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
