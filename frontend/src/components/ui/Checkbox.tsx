import React from 'react';
import { cva } from 'class-variance-authority';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const checkboxStyles = cva('form-checkbox h-4 w-4 text-primary-700', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-white'
    }
  }
});

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, ...props }) => {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className={checkboxStyles({ checked })} checked={checked} {...props} />
      <span className="ml-2 text-primary-700">{label}</span>
    </label>
  );
};