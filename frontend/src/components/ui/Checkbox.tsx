import React from 'react';
import { cva } from 'class-variance-authority';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const checkboxStyles = cva('form-checkbox h-5 w-5 text-primary-700', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-white'
    }
  }
});

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, ...props }) => {
  return (
    <label className="flex items-center space-x-2">
      <input type="checkbox" className={checkboxStyles({ checked })} checked={checked} {...props} />
      <span>{label}</span>
    </label>
  );
};