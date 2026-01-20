import React, { useState } from 'react'
import { useTeams } from '../context/TeamContext'

const TeamSelector: React.FC = () => {
  const { teams, loading } = useTeams()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(teams[0]?.id || '')

  if (loading || !teams.length) return null

  return (
    <div className="relative">
      <button
        className="px-3 py-1 rounded bg-blue-50 hover:bg-blue-100 font-semibold"
        onClick={() => setOpen(o => !o)}
      >
        {teams.find(t => t.id === selected)?.name || 'Select Team'}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow w-40 z-10">
          {teams.map(team => (
            <button
              key={team.id}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${selected === team.id ? 'font-bold' : ''}`}
              onClick={() => { setSelected(team.id); setOpen(false) }}
            >
              {team.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TeamSelector
