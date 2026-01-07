import React, { useEffect, useState } from 'react'
import { getDeals, deleteDeal, getContacts, Deal, Contact } from '../utils/apiClient'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'

const STAGES = [
  { value: 'lead', label: 'Lead' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' }
]

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stage, setStage] = useState<string>('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const navigate = useNavigate()

  const fetchDeals = () => {
    setLoading(true)
    getDeals(stage ? { stage } : undefined)
      .then(res => setDeals(res.items))
      .catch(() => setError('Failed to load deals'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getContacts().then(res => setContacts(res.items)).catch(() => {})
  }, [])

  useEffect(() => {
    fetchDeals()
    // eslint-disable-next-line
  }, [stage])

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this deal?')) return
    setDeletingId(id)
    try {
      await deleteDeal(id)
      fetchDeals()
    } catch {
      setError('Failed to delete deal')
    } finally {
      setDeletingId(null)
    }
  }

  function getContactName(contactId: string) {
    const c = contacts.find(c => c.id === contactId)
    return c ? `${c.name} (${c.email})` : 'Unknown'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Deals</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate('/deals/new')}
        >
          <FiPlus /> New Deal
        </button>
      </div>
      <div className="mb-4 flex gap-2 items-center">
        <label className="font-medium">Filter by Stage:</label>
        <select
          className="border rounded px-2 py-1"
          value={stage}
          onChange={e => setStage(e.target.value)}
        >
          <option value="">All</option>
          {STAGES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading deals...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Stage</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {deals.map(d => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{d.title}</td>
                  <td className="px-4 py-2">${d.value.toLocaleString()}</td>
                  <td className="px-4 py-2 capitalize">{d.stage}</td>
                  <td className="px-4 py-2">{getContactName(d.contactId)}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/deals/${d.id}/edit`)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      disabled={deletingId === d.id}
                      onClick={() => handleDelete(d.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {deals.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">No deals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
