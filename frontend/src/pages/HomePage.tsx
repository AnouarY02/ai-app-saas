import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to TestApp</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        TestApp is your AI-powered SaaS platform. Sign in to access your dashboard and unlock powerful features.
      </p>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition-colors"
      >
        Get Started
      </Link>
    </section>
  )
}

export default HomePage
