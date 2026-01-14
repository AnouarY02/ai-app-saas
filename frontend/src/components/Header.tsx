import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
        <span className="text-xl font-bold text-blue-600">Padel Club Manager</span>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-gray-700">{user.name} ({user.role})</span>
            <button
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}
