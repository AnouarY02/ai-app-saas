import React from 'react';
import { cva } from 'class-variance-authority';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
};

const selectStyles = cva('form-select block w-full mt-1 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5');

export const Select: React.FC<SelectProps> = ({ options, className, ...props }) => {
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