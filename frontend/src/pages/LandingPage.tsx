import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
    <h1 className="text-4xl font-bold text-blue-700">Welcome to Task Manager Pro</h1>
    <p className="text-lg text-gray-600">Organize your tasks, boost your productivity.</p>
    <div className="flex gap-4">
      <Link to="/login" className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Login</Link>
      <Link to="/register" className="px-6 py-2 rounded bg-gray-200 text-blue-700 hover:bg-gray-300">Register</Link>
    </div>
  </div>
)

export default LandingPage
