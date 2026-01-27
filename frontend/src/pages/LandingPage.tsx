import React from 'react'
import { FaRocket } from 'react-icons/fa'

const LandingPage: React.FC = () => {
  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-center text-center py-16">
      <div className="flex items-center justify-center mb-6">
        <span className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 p-4">
          <FaRocket size={36} />
        </span>
      </div>
      <h1 className="text-4xl font-extrabold mb-4 text-blue-700">Welcome to Padel Club Pro</h1>
      <p className="text-lg text-gray-700 mb-8">
        The all-in-one platform to manage, promote, and grow your padel club. Streamline bookings, engage your community, and elevate your club's experience with AI-powered tools.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow transition-colors"
          disabled
        >
          Get Started (Coming Soon)
        </button>
      </div>
    </section>
  )
}

export default LandingPage
