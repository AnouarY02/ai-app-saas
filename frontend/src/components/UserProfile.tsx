import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateCurrentUser, UserProfileUpdateRequest } from '../utils/apiClient'

export default function UserProfile() {
  const { user, refresh } = useAuth()
  const [form, setForm] = useState<UserProfileUpdateRequest>({
    full_name: user?.full_name || '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await updateCurrentUser(form)
      setSuccess('Profile updated!')
      setForm(f => ({ ...f, password: '' }))
      await refresh()
    } catch (e: any) {
      setError(e.message || 'Update failed')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 flex flex-col gap-3 max-w-lg">
      <div className="font-semibold mb-1">Profile</div>
      <label className="flex flex-col gap-1">
        <span className="text-sm">Full Name</span>
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">Change Password</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Leave blank to keep current"
        />
      </label>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
