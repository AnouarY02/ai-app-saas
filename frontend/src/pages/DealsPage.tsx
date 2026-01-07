import React, { useEffect, useState } from 'react'
import { fetchDeals, deleteDeal, Deal, PaginatedResult } from '../utils/apiClient'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

export default function DealsPage() {
  const { user } = useAuth()
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    fetchDeals(token)
      .then((res: PaginatedResult<Deal>) => setDeals(res.items))
      .catch(() => setError('Failed to load deals'))
      .finally(() => setLoading(false))
  }, [refresh])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this deal?')) return
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      await deleteDeal(token, id)
      setRefresh(r => r + 1)
    } catch {
      setError('Failed to delete deal')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Deals</h2>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/deals/new')}
        >
          <FaPlus /> New Deal
        </button>
      </div>
      {loading ? (
        <div>Loading deals...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
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
              {deals.map(deal => (
                <tr key={deal.id} className="border-b">
                  <td className="px-4 py-2">{deal.title}</td>
                  <td className="px-4 py-2">${deal.value.toLocaleString()}</td>
                  <td className="px-4 py-2">{deal.stage}</td>
                  <td className="px-4 py-2">{deal.contactId || '-'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/deals/${deal.id}`)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(deal.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {deals.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">No deals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
