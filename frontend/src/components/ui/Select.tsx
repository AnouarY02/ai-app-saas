import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ options, ...props }) => {
  return (
    <select className="form-select mt-1 block w-full bg-white border border-gray-300 text-primary-700" {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-primary-700">
          {option.label}
        </option>
      ))}
    </select>
  );
};