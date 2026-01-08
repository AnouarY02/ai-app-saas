import React from 'react'

interface InfoCardProps {
  title: string
  children: React.ReactNode
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => (
  <div className="bg-white rounded shadow p-6 max-w-lg w-full mb-6">
    <h2 className="text-lg font-semibold mb-2 text-blue-700">{title}</h2>
    <div className="text-gray-700">{children}</div>
  </div>
)

export default InfoCard
