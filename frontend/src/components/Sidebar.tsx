import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTachometerAlt, FaCog } from 'react-icons/fa'

const menu = [
  { label: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
  { label: 'Settings', path: '/settings', icon: <FaCog /> },
]

const Sidebar: React.FC = () => {
  const location = useLocation()
  return (
    <aside className="w-56 min-h-screen bg-white border-r flex flex-col py-6 px-4">
      <div className="mb-8 text-2xl font-bold text-indigo-700">AI App</div>
      <nav className="flex flex-col gap-2">
        {menu.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-indigo-50 transition-colors ${location.pathname === item.path ? 'bg-indigo-100 font-semibold text-indigo-700' : 'text-gray-700'}`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
