import React from 'react';
import { cva } from 'class-variance-authority';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const selectStyles = cva('form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50');

const Select: React.FC<SelectProps> = ({ options, className, ...props }) => {
  return (
    <select className={selectStyles({ className })} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;