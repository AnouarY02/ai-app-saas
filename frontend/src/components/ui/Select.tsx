import React from 'react';
import { cva } from 'class-variance-authority';

type SelectProps = {
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  id: string;
};

const selectStyles = cva('form-select text-primary-700', {
  variants: {
    base: 'bg-white border border-primary-600',
  },
});

export const Select: React.FC<SelectProps> = ({ options, selectedValue, onChange, id }) => {
  return (
    <select
      id={id}
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
      className={selectStyles()}
      aria-labelledby={id}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};