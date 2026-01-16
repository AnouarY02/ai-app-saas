import React from 'react';
import { cva } from 'class-variance-authority';

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const checkboxStyles = cva('form-checkbox h-4 w-4 text-primary-700', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-white',
    },
  },
});

const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange }) => {
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

export default Checkbox;