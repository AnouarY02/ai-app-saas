import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProfileMenu from './ProfileMenu'
import { FaTasks, FaTachometerAlt, FaList } from 'react-icons/fa'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
  { label: 'My Tasks', path: '/dashboard', icon: <FaList /> }
]

const Header: React.FC = () => {
  const { user } = useAuth()
  const location = useLocation()
  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-4 py-3">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
        <FaTasks className="text-blue-500" />
        TaskManager
      </Link>
      {user ? (
        <nav className="flex items-center gap-4">
          {navItems.map(item => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition text-gray-700 ${location.pathname === item.path ? 'font-semibold text-blue-600' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <ProfileMenu />
        </nav>
      ) : (
        <nav className="flex items-center gap-2">
          <Link to="/login" className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Login</Link>
          <Link to="/register" className="px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">Register</Link>
        </nav>
      )}
    </header>
  )
}

export default Header
