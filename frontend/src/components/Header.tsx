import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaInfoCircle } from 'react-icons/fa'

interface MenuItem {
  label: string
  path: string
  icon: React.ReactNode
}

const menu: MenuItem[] = [
  { label: 'Home', path: '/', icon: <FaHome /> },
  { label: 'About', path: '/about', icon: <FaInfoCircle /> },
]

const Header: React.FC = () => {
  const location = useLocation()
  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      <div className="text-xl font-bold tracking-tight text-blue-700">Test App</div>
      <nav className="flex gap-4">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition-colors ${location.pathname === item.path ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
