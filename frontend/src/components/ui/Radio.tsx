import React from 'react';
import { cva } from 'class-variance-authority';

type RadioProps = {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const radioStyles = cva('form-radio h-4 w-4 text-primary-700', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-white',
    },
  },
});

export const Radio: React.FC<RadioProps> = ({ name, options, selectedValue, onChange }) => {
  return (
    <div>
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`${name}-${option.value}`}
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className={radioStyles({ checked: selectedValue === option.value })}
            aria-checked={selectedValue === option.value}
          />
          <label htmlFor={`${name}-${option.value}`} className="ml-2 text-primary-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};