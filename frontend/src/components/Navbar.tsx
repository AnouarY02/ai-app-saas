import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      <div className="text-xl font-bold text-blue-600">FitTrack Pro</div>
      <div className="flex items-center gap-4">
        {user && (
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            onClick={() => navigate('/settings')}
            title="Profile"
          >
            <FaUserCircle size={22} />
            <span className="hidden sm:inline">{user.full_name}</span>
          </button>
        )}
        <button
          className="flex items-center gap-2 text-gray-700 hover:text-red-600"
          onClick={handleLogout}
          title="Logout"
        >
          <FaSignOutAlt size={20} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  )
}
