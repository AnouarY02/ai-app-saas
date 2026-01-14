import React from 'react'
import { Court } from '../utils/apiClient'

interface CourtListProps {
  courts: Court[]
  onEdit?: (court: Court) => void
  onDelete?: (id: string) => void
}

export default function CourtList({ courts, onEdit, onDelete }: CourtListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courts.map((court) => (
        <div key={court.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
          <div className="font-semibold text-blue-700">{court.name}</div>
          <div className="text-sm text-gray-500">{court.location || 'No location'}</div>
          <div className="text-xs text-gray-400">Surface: {court.surfaceType || 'N/A'}</div>
          <div className="flex gap-2 mt-2">
            {onEdit && (
              <button
                className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                onClick={() => onEdit(court)}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                onClick={() => onDelete(court.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
