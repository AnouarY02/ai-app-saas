import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { getContact, createContact, updateContact, Contact } from '../utils/apiClient'

interface Props {
  mode: 'create' | 'edit'
}

export default function ContactFormPage({ mode }: Props) {
  const { id } = useParams<{ id: string }>()
  const [initial, setInitial] = useState<Partial<Contact>>({})
  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoading(true)
      getContact(id)
        .then(setInitial)
        .catch(() => setError('Failed to load contact'))
        .finally(() => setLoading(false))
    }
  }, [mode, id])

  async function handleSubmit(data: any) {
    setSaving(true)
    setError(null)
    try {
      if (mode === 'create') {
        await createContact(data)
      } else if (mode === 'edit' && id) {
        await updateContact(id, data)
      }
      navigate('/contacts')
    } catch (e: any) {
      setError(e.message || 'Failed to save contact')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">{mode === 'create' ? 'New Contact' : 'Edit Contact'}</h1>
      <ContactForm
        initial={initial}
        onSubmit={handleSubmit}
        loading={saving}
        mode={mode}
      />
    </div>
  )
}
