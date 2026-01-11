import React from 'react'

const Home: React.FC = () => {
  return (
    <section className="max-w-xl w-full mx-auto bg-white rounded shadow p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to Padel Club Manager</h1>
      <p className="text-gray-700 text-lg text-center mb-6">
        Manage your padel club with ease. Organize matches, track memberships, and more—all in one place.
      </p>
      <div className="flex flex-col gap-2 w-full">
        <div className="rounded bg-blue-50 p-4 text-blue-800 text-center">
          This is a demo homepage. More features coming soon!
        </div>
      </div>
    </section>
  )
}

export default Home
