import React from 'react';
import { cva } from 'class-variance-authority';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
};

const selectStyles = cva('form-select block w-full mt-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md');

export const Select: React.FC<SelectProps> = ({ options, ...props }) => (
  <select className={selectStyles()} {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);