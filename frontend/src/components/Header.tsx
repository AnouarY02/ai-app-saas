import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const menu = [
  { label: 'Home', path: '/', icon: <FaHome size={18} /> },
]

const Header: React.FC = () => {
  const location = useLocation()
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600">Padel Club Pro</span>
        </div>
        <ul className="flex items-center gap-6">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors ${location.pathname === item.path ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
