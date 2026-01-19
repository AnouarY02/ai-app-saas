import React from 'react';
import { cva } from 'class-variance-authority';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  checked: boolean;
}

const radioStyles = cva('form-radio h-4 w-4 text-primary-700', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-white'
    }
  }
});

export const Radio: React.FC<RadioProps> = ({ label, name, checked, ...props }) => (
  <div className="flex items-center">
    <input
      type="radio"
      name={name}
      className={radioStyles({ checked })}
      checked={checked}
      {...props}
    />
    <label className="ml-2 text-primary-700">{label}</label>
  </div>
);