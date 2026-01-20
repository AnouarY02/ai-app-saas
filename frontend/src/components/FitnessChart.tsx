import React from 'react'
import { Workout } from '../utils/apiClient'

interface FitnessChartProps {
  workouts: Workout[]
}

// Simple bar chart using SVG (no external chart lib)
export default function FitnessChart({ workouts }: FitnessChartProps) {
  // Group by date, sum calories
  const data = workouts.reduce<{ [date: string]: number }>((acc, w) => {
    acc[w.date] = (acc[w.date] || 0) + w.calories_burned
    return acc
  }, {})
  const dates = Object.keys(data).sort()
  const maxCalories = Math.max(1, ...Object.values(data))

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-2">Calories Burned (by Day)</div>
      <svg width="100%" height="120" viewBox={`0 0 ${dates.length * 40} 100`} className="w-full">
        {dates.map((date, i) => {
          const val = data[date]
          const barHeight = (val / maxCalories) * 80
          return (
            <g key={date}>
              <rect
                x={i * 40 + 10}
                y={100 - barHeight}
                width={20}
                height={barHeight}
                fill="#3b82f6"
                rx={4}
              />
              <text
                x={i * 40 + 20}
                y={110}
                textAnchor="middle"
                fontSize={10}
                fill="#64748b"
              >
                {date.slice(5)}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
