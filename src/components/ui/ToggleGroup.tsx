'use client'

interface Option {
  value: string
  label: string
  description?: string
}

interface ToggleGroupProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  label?: string
}

export function ToggleGroup({ options, value, onChange, label }: ToggleGroupProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              w-full text-left p-4 rounded-xl border-2 transition-all duration-200
              ${
                value === option.value
                  ? 'border-volt-500 bg-volt-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${value === option.value ? 'border-volt-500' : 'border-gray-300'}`}
              >
                {value === option.value && (
                  <div className="w-3 h-3 rounded-full bg-volt-500" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-gray-500 mt-0.5">{option.description}</div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
