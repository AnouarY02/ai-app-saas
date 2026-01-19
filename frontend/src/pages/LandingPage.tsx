import React from 'react'
import { Link } from 'react-router-dom'
import { FaRobot } from 'react-icons/fa'

const LandingPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <FaRobot className="text-6xl text-indigo-600 mb-4" />
    <h1 className="text-4xl font-bold mb-2 text-gray-900">Welcome to AI App</h1>
    <p className="text-lg text-gray-600 mb-6 max-w-xl text-center">
      Unlock the power of AI for your business. Sign up to access your dashboard and manage your account.
    </p>
    <div className="flex gap-4">
      <Link to="/signup" className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700">Get Started</Link>
      <Link to="/login" className="bg-white border border-indigo-600 text-indigo-700 px-6 py-2 rounded font-semibold hover:bg-indigo-50">Login</Link>
    </div>
  </div>
)

export default LandingPage
