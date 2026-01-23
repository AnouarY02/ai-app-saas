import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

const ProfileMenu: React.FC = () => {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
        onClick={() => setOpen(o => !o)}
      >
        <FaUserCircle className="text-xl text-blue-600" />
        <span>{user?.name || user?.email}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
          <button
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
