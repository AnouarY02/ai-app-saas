import React from 'react';
import { cva } from 'class-variance-authority';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
};

const checkboxStyles = cva('form-checkbox h-4 w-4 text-primary-700', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-white',
    },
  },
});

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, id }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={checkboxStyles({ checked })}
        aria-checked={checked}
      />
      <label htmlFor={id} className="ml-2 text-primary-700">
        {label}
      </label>
    </div>
  );
};