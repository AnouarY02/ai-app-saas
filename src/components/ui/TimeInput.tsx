'use client'

interface TimeInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function TimeInput({ value, onChange, label }: TimeInputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-medium
          focus:outline-none focus:ring-2 focus:ring-volt-500 focus:border-transparent
          bg-white"
      />
    </div>
  )
}
