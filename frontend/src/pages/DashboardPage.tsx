import React, { useEffect, useState } from 'react'
import { listWorkouts, Workout } from '../utils/apiClient'
import FitnessChart from '../components/FitnessChart'
import WorkoutForm from '../components/WorkoutForm'

export default function DashboardPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkouts = () => {
    setLoading(true)
    listWorkouts()
      .then(res => setWorkouts(res.workouts))
      .catch(e => setError(e.message || 'Failed to load workouts'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <WorkoutForm onCreated={fetchWorkouts} />
          <div className="bg-white rounded shadow p-4">
            <div className="font-semibold mb-2">Workout History</div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <ul className="divide-y">
                {workouts.map(w => (
                  <li key={w.id} className="py-2 flex flex-col md:flex-row md:items-center gap-2">
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
        </div>
        <div>
          <FitnessChart workouts={workouts} />
        </div>
      </div>
    </div>
  )
}
