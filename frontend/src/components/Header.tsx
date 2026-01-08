import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaList } from 'react-icons/fa'

const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-2">
        <FaList className="text-blue-600" />
        <Link to="/" className="text-xl font-bold text-blue-700">Task Manager Pro</Link>
      </div>
      <nav className="flex items-center gap-4">
        <Link to="/tasks" className="text-gray-700 hover:text-blue-600">Tasks</Link>
        {user ? (
          <>
            <span className="text-gray-500 text-sm">{user.email}</span>
            <button onClick={handleLogout} className="ml-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Login</Link>
            <Link to="/register" className="px-3 py-1 rounded bg-gray-200 text-blue-700 hover:bg-gray-300">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
