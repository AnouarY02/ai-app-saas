import React from 'react'

const LandingPage: React.FC = () => {
  return (
    <section className="w-full max-w-2xl mx-auto text-center py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Welcome to Test App</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        This is a minimal AI SaaS landing page. Start building your next big idea with React, TypeScript, and Vite!
      </p>
      <div className="flex justify-center">
        <a
          href="https://vitejs.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Learn More
        </a>
      </div>
    </section>
  )
}

export default LandingPage
