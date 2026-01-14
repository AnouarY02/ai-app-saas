import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaTachometerAlt, FaCalendarAlt, FaTableTennis, FaShieldAlt } from 'react-icons/fa'

const menu = [
  { label: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
  { label: 'Bookings', path: '/bookings', icon: <FaCalendarAlt /> },
  { label: 'Courts', path: '/courts', icon: <FaTableTennis /> },
]

export default function Sidebar() {
  const { user } = useAuth()
  return (
    <aside className="w-56 bg-white border-r min-h-screen flex flex-col py-6 px-2">
      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-50 transition ${isActive ? 'bg-blue-100 font-semibold text-blue-700' : 'text-gray-700'}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-50 transition ${isActive ? 'bg-blue-100 font-semibold text-blue-700' : 'text-gray-700'}`
            }
          >
            <FaShieldAlt />
            Admin
          </NavLink>
        )}
      </nav>
    </aside>
  )
}
