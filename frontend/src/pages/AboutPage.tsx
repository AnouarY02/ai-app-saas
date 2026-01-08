import React from 'react'
import InfoCard from '../components/InfoCard'

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <InfoCard title="About This App">
        <p className="mb-2">Test App demonstrates a minimal monorepo setup with React frontend and Express backend.</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Frontend: React + TypeScript + Vite</li>
          <li>Backend: Node.js + Express</li>
          <li>Shared utilities and types</li>
          <li>Easy to extend and deploy</li>
        </ul>
      </InfoCard>
    </div>
  )
}

export default AboutPage
