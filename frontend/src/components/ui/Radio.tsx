import React from 'react';
import { cva } from 'class-variance-authority';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const radioStyles = cva('form-radio h-5 w-5 text-primary-700', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-white'
    }
  }
});

export const Radio: React.FC<RadioProps> = ({ label, name, checked, ...props }) => {
  return (
    <label className="flex items-center space-x-2">
      <input type="radio" name={name} className={radioStyles({ checked })} checked={checked} {...props} />
      <span>{label}</span>
    </label>
  );
};