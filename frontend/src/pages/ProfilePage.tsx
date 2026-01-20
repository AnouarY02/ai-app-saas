import React, { useState } from 'react'
import { useUser } from '../context/UserContext'

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser()
  const [name, setName] = useState(user?.name || '')
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!user) return <div>Loading...</div>

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    try {
      await updateUser({ name, avatarUrl })
      setSuccess(true)
    } catch {
      setError('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="max-w-lg bg-white rounded shadow p-6 flex flex-col gap-4" onSubmit={handleSave}>
      <h2 className="text-xl font-bold mb-2">Profile</h2>
      <label className="font-semibold">Name</label>
      <input
        className="border rounded px-3 py-2"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label className="font-semibold">Avatar URL</label>
      <input
        className="border rounded px-3 py-2"
        value={avatarUrl}
        onChange={e => setAvatarUrl(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="submit"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      {success && <div className="text-green-600">Profile updated!</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  )
}

export default ProfilePage
