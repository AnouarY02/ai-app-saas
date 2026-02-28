'use client'

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  label?: string
  showValue?: boolean
  colorScale?: boolean // green for high, red for low
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  showValue = true,
  colorScale = false,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  const getColor = () => {
    if (!colorScale) return 'bg-volt-500'
    if (percentage >= 70) return 'bg-green-500'
    if (percentage >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <span className="text-sm font-bold text-gray-900">{value}</span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-volt-500
            [&::-webkit-slider-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${colorScale ? (percentage >= 70 ? '#22c55e' : percentage >= 40 ? '#eab308' : '#ef4444') : '#f59e0b'} 0%, ${colorScale ? (percentage >= 70 ? '#22c55e' : percentage >= 40 ? '#eab308' : '#ef4444') : '#f59e0b'} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">{min}</span>
        <span className="text-xs text-gray-400">{max}</span>
      </div>
    </div>
  )
}
