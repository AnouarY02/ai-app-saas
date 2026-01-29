import React from 'react';
import { cva } from 'class-variance-authority';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const checkboxStyles = cva('form-checkbox h-4 w-4 text-blue-600', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
});

const Checkbox: React.FC<CheckboxProps> = ({ label, disabled, ...props }) => {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className={checkboxStyles({ disabled })} disabled={disabled} {...props} />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;