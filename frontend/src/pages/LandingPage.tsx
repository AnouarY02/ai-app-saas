import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded shadow-lg p-8 max-w-lg w-full flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-blue-700">Padel Club Manager</h1>
        <p className="text-gray-700 text-center">
          The all-in-one platform to manage your padel club: bookings, courts, members, and more. Simple, fast, and secure.
        </p>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
          <button
            className="px-6 py-2 rounded bg-gray-200 text-blue-700 font-semibold hover:bg-gray-300"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
        <ul className="mt-4 text-left text-gray-600 text-sm list-disc pl-6">
          <li>Easy court and booking management</li>
          <li>Role-based access for admins and users</li>
          <li>Real-time availability and notifications</li>
          <li>Secure authentication</li>
        </ul>
      </div>
    </div>
  )
}
