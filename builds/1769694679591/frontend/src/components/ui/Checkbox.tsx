import React from 'react';
import { cva } from 'class-variance-authority';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const checkboxStyles = cva('form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out');

export const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className={checkboxStyles({ className })} {...props} />
      <span className="ml-2">{label}</span>
    </label>
  );
};