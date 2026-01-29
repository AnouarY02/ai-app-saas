import React from 'react';
import { cva } from 'class-variance-authority';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const checkboxStyles = cva('form-checkbox h-5 w-5 text-blue-600', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: ''
    }
  }
});

const Checkbox: React.FC<CheckboxProps> = ({ label, disabled, ...props }) => {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className={checkboxStyles({ disabled })} disabled={disabled} {...props} />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default Checkbox;