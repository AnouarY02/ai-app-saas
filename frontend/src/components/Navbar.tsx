import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaRobot } from 'react-icons/fa'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch {}
  }

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white shadow">
      <div className="flex items-center gap-2">
        <FaRobot className="text-indigo-600 text-2xl" />
        <Link to="/" className="text-xl font-bold text-indigo-700">AI App</Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-700">{user.name || user.email}</span>
            <button onClick={handleLogout} className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
            <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
