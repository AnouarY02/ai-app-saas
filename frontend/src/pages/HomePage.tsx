import React from 'react'
import InfoCard from '../components/InfoCard'

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <InfoCard title="Welcome to Test App">
        <p className="mb-2">This is a minimal React + TypeScript starter app.</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Monorepo structure (frontend, backend, shared, infra)</li>
          <li>React SPA with routing</li>
          <li>Reusable components</li>
          <li>Simple, clean UI</li>
        </ul>
      </InfoCard>
    </div>
  )
}

export default HomePage
