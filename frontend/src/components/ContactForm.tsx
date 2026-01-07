import React, { useState } from 'react'
import { Contact, ContactCreate, ContactUpdate } from '../utils/apiClient'

export interface ContactFormProps {
  initial?: Partial<Contact>
  onSubmit: (data: ContactCreate | ContactUpdate) => Promise<void>
  loading?: boolean
  mode: 'create' | 'edit'
}

export default function ContactForm({ initial = {}, onSubmit, loading, mode }: ContactFormProps) {
  const [form, setForm] = useState({
    name: initial.name || '',
    email: initial.email || '',
    phone: initial.phone || '',
    company: initial.company || ''
  })
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required')
      return
    }
    try {
      await onSubmit(form)
    } catch (e: any) {
      setError(e.message || 'Failed to save contact')
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Name *</label>
        <input
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email *</label>
        <input
          name="email"
          type="email"
          className="w-full border rounded px-3 py-2"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          name="phone"
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Company</label>
        <input
          name="company"
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.company}
          onChange={handleChange}
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Saving...' : mode === 'create' ? 'Create Contact' : 'Update Contact'}
      </button>
    </form>
  )
}
