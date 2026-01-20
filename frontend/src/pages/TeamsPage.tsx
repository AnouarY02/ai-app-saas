import React from 'react'
import { useTeams } from '../context/TeamContext'

const TeamsPage: React.FC = () => {
  const { teams, loading, error } = useTeams()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Teams</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map(team => (
            <div key={team.id} className="bg-white rounded shadow p-4">
              <div className="font-bold text-lg">{team.name}</div>
              <div className="text-gray-600 text-sm">Members: {team.members.length}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TeamsPage
