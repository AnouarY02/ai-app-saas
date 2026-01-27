import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

const Header: React.FC = () => {
  const { user } = useAuth()
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <h1 className="text-xl font-bold text-gray-800">Padel Club Pro</h1>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-600 text-sm">{user.email}</span>
        )}
        <Link to="/logout" className="flex items-center gap-1 text-red-500 hover:underline">
          <FiLogOut /> Logout
        </Link>
      </div>
    </header>
  )
}

export default Header
