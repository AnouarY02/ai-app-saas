import React from 'react';
import { cva } from 'class-variance-authority';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
};

const selectStyles = cva('form-select block w-full mt-1', {
  variants: {
    size: {
      sm: 'text-sm py-1',
      md: 'text-base py-2',
      lg: 'text-lg py-3'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

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