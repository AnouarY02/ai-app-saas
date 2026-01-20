import React, { useEffect, useState } from 'react'
import { listWorkouts, Workout } from '../utils/apiClient'
import FitnessChart from '../components/FitnessChart'

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    listWorkouts()
      .then(res => setWorkouts(res.workouts))
      .catch(e => setError(e.message || 'Failed to load workouts'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Welcome to FitTrack Pro</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4 text-lg font-semibold">Your Recent Workouts</div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <ul className="divide-y bg-white rounded shadow">
              {workouts.slice(0, 5).map(w => (
                <li key={w.id} className="p-3 flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-blue-700">{w.type}</span>
                  <span className="text-gray-500">{w.date}</span>
                  <span className="text-gray-700">{w.duration_minutes} min</span>
                  <span className="text-gray-700">{w.calories_burned} kcal</span>
                  <span className="text-gray-400 text-xs">{w.notes}</span>
                </li>
              ))}
              {workouts.length === 0 && <li className="p-3 text-gray-500">No workouts yet.</li>}
            </ul>
          )}
        </div>
        <div>
          <FitnessChart workouts={workouts} />
        </div>
      </div>
    </div>
  )
}
