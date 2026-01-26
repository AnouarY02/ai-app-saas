import React from 'react';
import { cva } from 'class-variance-authority';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
};

const selectStyles = cva('form-select block w-full mt-1 text-gray-700 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: ''
    }
  }
});

export const Select: React.FC<SelectProps> = ({ options, disabled, ...props }) => {
  return (
    <select className={selectStyles({ disabled })} disabled={disabled} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};