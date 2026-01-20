import React, { useState } from 'react'
import { User } from '../utils/apiClient'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface UserAvatarProps {
  user: User | null
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  if (!user) return null

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-50"
        onClick={() => setOpen(o => !o)}
      >
        <img
          src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          alt={user.name}
          className="w-8 h-8 rounded-full border"
        />
        <span className="hidden md:inline font-semibold">{user.name}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow w-40 z-10">
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-50"
            onClick={() => { setOpen(false); navigate('/profile') }}
          >
            Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-50"
            onClick={async () => { setOpen(false); await logout(); navigate('/login') }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
