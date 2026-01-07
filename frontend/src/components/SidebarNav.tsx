import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiHome, FiUsers, FiTrendingUp, FiUser, FiLogOut } from 'react-icons/fi'

const navItems = [
  { label: 'Dashboard', path: '/', icon: <FiHome size={20} /> },
  { label: 'Contacts', path: '/contacts', icon: <FiUsers size={20} /> },
  { label: 'Deals', path: '/deals', icon: <FiTrendingUp size={20} /> },
]

export default function SidebarNav() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <span className="font-bold text-xl text-blue-600">SaaS CRM</span>
      </div>
      <nav className="flex-1 px-2 py-4">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
            }
            end={item.path === '/'}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-3 border-t flex flex-col gap-2">
        <button
          className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition"
          onClick={() => navigate('/profile')}
        >
          <FiUser /> Profile
        </button>
        <button
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
          onClick={async () => {
            await logout()
            navigate('/login')
          }}
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  )
}
