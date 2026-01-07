import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DealForm from '../components/DealForm'
import { getDeal, createDeal, updateDeal, getContacts, Deal, Contact } from '../utils/apiClient'

interface Props {
  mode: 'create' | 'edit'
}

export default function DealFormPage({ mode }: Props) {
  const { id } = useParams<{ id: string }>()
  const [initial, setInitial] = useState<Partial<Deal>>({})
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getContacts().then(res => setContacts(res.items)).catch(() => setContacts([]))
    if (mode === 'edit' && id) {
      setLoading(true)
      getDeal(id)
        .then(setInitial)
        .catch(() => setError('Failed to load deal'))
        .finally(() => setLoading(false))
    }
  }, [mode, id])

  async function handleSubmit(data: any) {
    setSaving(true)
    setError(null)
    try {
      if (mode === 'create') {
        await createDeal(data)
      } else if (mode === 'edit' && id) {
        await updateDeal(id, data)
      }
      navigate('/deals')
    } catch (e: any) {
      setError(e.message || 'Failed to save deal')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">{mode === 'create' ? 'New Deal' : 'Edit Deal'}</h1>
      <DealForm
        initial={initial}
        contacts={contacts}
        onSubmit={handleSubmit}
        loading={saving}
        mode={mode}
      />
    </div>
  )
}
