import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

const Header: React.FC = () => {
  const location = useLocation()
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-2">
          <FiHome className="text-xl text-blue-600" />
          <Link to="/" className="text-xl font-bold text-blue-700 tracking-tight">Test App</Link>
        </div>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/"
              className={`text-base font-medium ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-500 transition`}
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
