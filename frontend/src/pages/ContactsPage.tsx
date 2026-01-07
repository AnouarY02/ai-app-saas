import React, { useEffect, useState } from 'react'
import { getContacts, deleteContact, Contact } from '../utils/apiClient'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const navigate = useNavigate()

  const fetchContacts = () => {
    setLoading(true)
    getContacts()
      .then(res => setContacts(res.items))
      .catch(() => setError('Failed to load contacts'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this contact?')) return
    setDeletingId(id)
    try {
      await deleteContact(id)
      fetchContacts()
    } catch {
      setError('Failed to delete contact')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate('/contacts/new')}
        >
          <FiPlus /> New Contact
        </button>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading contacts...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">{c.company}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/contacts/${c.id}/edit`)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      disabled={deletingId === c.id}
                      onClick={() => handleDelete(c.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">No contacts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
