import React from 'react'
import { Booking, Court } from '../utils/apiClient'

interface BookingCardProps {
  booking: Booking
  court?: Court
  onCancel?: (id: string) => void
}

export default function BookingCard({ booking, court, onCancel }: BookingCardProps) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-blue-700">{court?.name || booking.courtId}</div>
          <div className="text-sm text-gray-500">{new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}</div>
          <div className="text-xs text-gray-400">Status: {booking.status}</div>
        </div>
        {onCancel && booking.status === 'active' && (
          <button
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
            onClick={() => onCancel(booking.id)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
