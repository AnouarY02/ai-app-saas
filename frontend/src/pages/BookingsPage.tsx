import React, { useEffect, useState } from 'react'
import { getBookings, getCourts, createBooking, cancelBooking, Booking, Court } from '../utils/apiClient'
import BookingCard from '../components/BookingCard'
import { useAuth } from '../context/AuthContext'

export default function BookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [courts, setCourts] = useState<Court[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<{ courtId: string; startTime: string; endTime: string }>({ courtId: '', startTime: '', endTime: '' })
  const [formError, setFormError] = useState<string | null>(null)
  const [formLoading, setFormLoading] = useState(false)

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
        setError(e.message || 'Failed to load bookings')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  const handleCancel = async (id: string) => {
    if (!window.confirm('Cancel this booking?')) return
    try {
      await cancelBooking(id)
      setBookings(bookings => bookings.filter(b => b.id !== id))
    } catch (e: any) {
      alert(e.message || 'Failed to cancel booking')
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!form.courtId || !form.startTime || !form.endTime) {
      setFormError('All fields required')
      return
    }
    setFormLoading(true)
    try {
      const booking = await createBooking(form)
      setBookings(b => [booking, ...b])
      setShowForm(false)
      setForm({ courtId: '', startTime: '', endTime: '' })
    } catch (e: any) {
      setFormError(e.message || 'Failed to create booking')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Bookings</h1>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
          onClick={() => setShowForm(f => !f)}
        >
          {showForm ? 'Close' : 'New Booking'}
        </button>
      </div>
      {showForm && (
        <form className="bg-white rounded shadow p-6 flex flex-col gap-4 max-w-lg" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Court</label>
            <select
              name="courtId"
              className="border rounded px-3 py-2"
              value={form.courtId}
              onChange={handleFormChange}
            >
              <option value="">Select court</option>
              {courts.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              className="border rounded px-3 py-2"
              value={form.startTime}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              className="border rounded px-3 py-2"
              value={form.endTime}
              onChange={handleFormChange}
            />
          </div>
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            type="submit"
            disabled={formLoading}
          >
            {formLoading ? 'Booking...' : 'Book Court'}
          </button>
        </form>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : bookings.length === 0 ? (
        <div className="text-gray-500">No bookings yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map(b => (
            <BookingCard
              key={b.id}
              booking={b}
              court={courts.find(c => c.id === b.courtId)}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  )
}
