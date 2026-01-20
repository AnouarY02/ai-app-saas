import React from 'react';
import { cva } from 'class-variance-authority';

type SelectProps = {
  id: string;
  options: { label: string; value: string }[];
  selectedValue?: string;
  onChange?: (value: string) => void;
};

const selectStyles = cva('form-select text-primary-700', {
  variants: {
    filled: {
      true: 'bg-primary-600',
      false: 'bg-white'
    }
  }
});

export const Select: React.FC<SelectProps> = ({ id, options, selectedValue, onChange }) => {
  return (
    <select
      id={id}
      value={selectedValue}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={selectStyles({ filled: !!selectedValue })}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-primary-700">
          {option.label}
        </option>
      ))}
    </select>
  );
};