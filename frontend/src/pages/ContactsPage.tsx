import React, { useEffect, useState } from 'react'
import { fetchContacts, deleteContact, Contact, PaginatedResult } from '../utils/apiClient'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

export default function ContactsPage() {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    fetchContacts(token, search)
      .then((res: PaginatedResult<Contact>) => setContacts(res.items))
      .catch(() => setError('Failed to load contacts'))
      .finally(() => setLoading(false))
  }, [search, refresh])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this contact?')) return
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      await deleteContact(token, id)
      setRefresh(r => r + 1)
    } catch {
      setError('Failed to delete contact')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/contacts/new')}
        >
          <FaPlus /> New Contact
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 w-full md:w-1/3"
          placeholder="Search contacts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div>Loading contacts...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
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
              {contacts.map(contact => (
                <tr key={contact.id} className="border-b">
                  <td className="px-4 py-2">{contact.name}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.phone}</td>
                  <td className="px-4 py-2">{contact.company}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/contacts/${contact.id}`)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(contact.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">No contacts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
