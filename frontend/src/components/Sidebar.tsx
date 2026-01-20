import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaChartBar, FaCog } from 'react-icons/fa'

const navItems = [
  { label: 'Home', path: '/', icon: <FaHome /> },
  { label: 'Dashboard', path: '/dashboard', icon: <FaChartBar /> },
  { label: 'Settings', path: '/settings', icon: <FaCog /> },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 bg-white border-r min-h-screen shadow-sm">
      <div className="h-16 flex items-center justify-center text-2xl font-bold text-blue-600 border-b">FitTrack</div>
      <nav className="flex-1 flex flex-col gap-2 p-4">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
            }
            end={item.path === '/'}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
