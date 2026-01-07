import React, { useState, useEffect } from 'react'
import { Deal, DealCreate, DealUpdate, Contact } from '../utils/apiClient'

export interface DealFormProps {
  initial?: Partial<Deal>
  contacts: Contact[]
  onSubmit: (data: DealCreate | DealUpdate) => Promise<void>
  loading?: boolean
  mode: 'create' | 'edit'
}

const STAGES = [
  { value: 'lead', label: 'Lead' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' }
]

export default function DealForm({ initial = {}, contacts, onSubmit, loading, mode }: DealFormProps) {
  const [form, setForm] = useState({
    title: initial.title || '',
    value: initial.value?.toString() || '',
    stage: initial.stage || 'lead',
    contactId: initial.contactId || (contacts[0]?.id || '')
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!form.contactId && contacts.length > 0) {
      setForm(f => ({ ...f, contactId: contacts[0].id }))
    }
  }, [contacts])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.title.trim() || !form.value.trim() || !form.contactId) {
      setError('Title, value, and contact are required')
      return
    }
    const valueNum = Number(form.value)
    if (isNaN(valueNum) || valueNum < 0) {
      setError('Value must be a positive number')
      return
    }
    try {
      await onSubmit({
        title: form.title,
        value: valueNum,
        stage: form.stage,
        contactId: form.contactId
      })
    } catch (e: any) {
      setError(e.message || 'Failed to save deal')
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Title *</label>
        <input
          name="title"
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Value *</label>
        <input
          name="value"
          type="number"
          min="0"
          className="w-full border rounded px-3 py-2"
          value={form.value}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Stage *</label>
        <select
          name="stage"
          className="w-full border rounded px-3 py-2"
          value={form.stage}
          onChange={handleChange}
        >
          {STAGES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Contact *</label>
        <select
          name="contactId"
          className="w-full border rounded px-3 py-2"
          value={form.contactId}
          onChange={handleChange}
        >
          {contacts.map(c => (
            <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
          ))}
        </select>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Saving...' : mode === 'create' ? 'Create Deal' : 'Update Deal'}
      </button>
    </form>
  )
}
