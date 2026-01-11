import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const Header: React.FC = () => {
  const location = useLocation()
  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-blue-600">Padel Club Manager</span>
      </div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className={`flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-50 transition-colors ${location.pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}> <FaHome className="inline" /> Home </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
