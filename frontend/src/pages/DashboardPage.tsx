import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getBookings, getCourts, Booking, Court } from '../utils/apiClient'
import BookingCard from '../components/BookingCard'

export default function DashboardPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [courts, setCourts] = useState<Court[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [b, c] = await Promise.all([
          getBookings({ userId: user?.id }),
          getCourts()
        ])
        setBookings(b)
        setCourts(c)
      } catch (e: any) {
        setError(e.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-blue-700">Welcome, {user?.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Bookings</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : bookings.length === 0 ? (
            <div className="text-gray-500">No bookings yet.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {bookings.map(b => (
                <BookingCard key={b.id} booking={b} court={courts.find(c => c.id === b.courtId)} />
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Available Courts</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : courts.length === 0 ? (
            <div className="text-gray-500">No courts available.</div>
          ) : (
            <ul className="flex flex-col gap-2">
              {courts.map(c => (
                <li key={c.id} className="bg-white rounded px-4 py-2 shadow flex items-center gap-2">
                  <span className="font-semibold text-blue-700">{c.name}</span>
                  <span className="text-xs text-gray-500">{c.location}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
