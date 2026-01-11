import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const Header: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <header className="w-full bg-white shadow flex items-center px-6 py-3">
      <nav className="flex gap-6 items-center">
        <Link to="/" className={`flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors ${pathname === '/' ? 'font-bold text-blue-600' : ''}`}>
          <FaHome className="text-xl" />
          Home
        </Link>
      </nav>
    </header>
  )
}

export default Header
