import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaTachometerAlt, FaAddressBook, FaHandshake, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const menu = [
  { label: 'Dashboard', path: '/', icon: <FaTachometerAlt /> },
  { label: 'Contacts', path: '/contacts', icon: <FaAddressBook /> },
  { label: 'Deals', path: '/deals', icon: <FaHandshake /> },
]

export default function Sidebar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-56 bg-white shadow flex flex-col min-h-screen">
      <div className="flex items-center gap-2 p-6 border-b border-gray-200">
        <span className="text-xl font-bold text-blue-600">SaaS CRM</span>
      </div>
      <nav className="flex-1 py-4">
        {menu.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 transition ${isActive ? 'bg-blue-100 font-semibold' : ''}`
            }
            end={item.path === '/'}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-gray-200 p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-600">
          <FaUser />
          <span>{user?.name || user?.email}</span>
        </div>
        <button
          className="flex items-center gap-2 text-red-500 hover:text-red-700 mt-2"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  )
}
