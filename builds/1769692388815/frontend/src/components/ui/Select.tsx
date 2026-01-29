import React from 'react';
import { cva } from 'class-variance-authority';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const selectStyles = cva('form-select block w-full mt-1', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
});

const Select: React.FC<SelectProps> = ({ options, disabled, ...props }) => {
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

export default Select;