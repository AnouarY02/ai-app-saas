import React, { useEffect, useState } from 'react'
import { getUsers, updateUser, deleteUser, UserPublic } from '../utils/apiClient'
import { useAuth } from '../context/AuthContext'

export default function AdminPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<UserPublic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editUser, setEditUser] = useState<UserPublic | null>(null)
  const [editRole, setEditRole] = useState<'user' | 'admin'>('user')
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const us = await getUsers()
        setUsers(us)
      } catch (e: any) {
        setError(e.message || 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleEdit = (u: UserPublic) => {
    setEditUser(u)
    setEditRole(u.role)
    setEditError(null)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editUser) return
    setEditLoading(true)
    setEditError(null)
    try {
      const updated = await updateUser(editUser.id, { role: editRole })
      setUsers(us => us.map(u => (u.id === updated.id ? updated : u)))
      setEditUser(null)
    } catch (e: any) {
      setEditError(e.message || 'Failed to update user')
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this user?')) return
    try {
      await deleteUser(id)
      setUsers(us => us.filter(u => u.id !== id))
    } catch (e: any) {
      alert(e.message || 'Failed to delete user')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-blue-700">Admin Panel</h1>
      <h2 className="text-lg font-semibold">Users</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </button>
                  {u.id !== user?.id && (
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editUser && (
        <form className="bg-white rounded shadow p-6 flex flex-col gap-4 max-w-md" onSubmit={handleEditSubmit}>
          <h3 className="font-semibold">Edit User Role</h3>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Role</label>
            <select
              value={editRole}
              onChange={e => setEditRole(e.target.value as 'user' | 'admin')}
              className="border rounded px-3 py-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {editError && <div className="text-red-600 text-sm">{editError}</div>}
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
              type="submit"
              disabled={editLoading}
            >
              {editLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              className="px-4 py-2 rounded bg-gray-200 text-blue-700 font-semibold hover:bg-gray-300"
              type="button"
              onClick={() => setEditUser(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
