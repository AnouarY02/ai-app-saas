import React from 'react'
import { Link } from 'react-router-dom'
import { FaTasks } from 'react-icons/fa'

const LandingPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <FaTasks className="text-6xl text-blue-500 mb-4" />
    <h1 className="text-3xl font-bold mb-2 text-center">Welcome to TaskManager</h1>
    <p className="text-gray-600 mb-6 text-center max-w-md">
      Organize your work, track your progress, and get things done efficiently. Sign up or log in to start managing your tasks!
    </p>
    <div className="flex gap-4">
      <Link to="/login" className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Login</Link>
      <Link to="/register" className="px-6 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">Register</Link>
    </div>
  </div>
)

export default LandingPage
