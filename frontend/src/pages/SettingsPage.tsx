import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateMe } from '../utils/apiClient'
import LoadingSpinner from '../components/LoadingSpinner'

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await updateMe({ name, email, password: password || undefined })
      setSuccess('Profile updated!')
      setPassword('')
    } catch (err: any) {
      setError(err.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-8">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Settings</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            className="border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            className="border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-gray-700">New Password</span>
          <input
            type="password"
            className="border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
          />
        </label>
        {success && <div className="text-green-600 text-sm">{success}</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size={20} /> : 'Update Profile'}
        </button>
      </form>
      <button
        onClick={logout}
        className="mt-6 text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </div>
  )
}

export default SettingsPage
