import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiHome, FiGrid, FiLogOut, FiLogIn } from 'react-icons/fi'

const navItems = [
  { label: 'Home', path: '/', icon: <FiHome /> },
  { label: 'Dashboard', path: '/dashboard', icon: <FiGrid /> }
]

function Header() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-blue-700">TestApp</span>
      </div>
      <nav className="flex items-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors ${location.pathname === item.path ? 'text-blue-700 font-semibold' : 'text-gray-700'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-2 py-1 rounded text-red-600 hover:bg-red-50 transition-colors"
            title="Logout"
          >
            <FiLogOut /> Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1 px-2 py-1 rounded text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <FiLogIn /> Login
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
