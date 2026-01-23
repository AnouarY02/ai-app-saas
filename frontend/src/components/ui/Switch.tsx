import React from 'react';
import { cva } from 'class-variance-authority';

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11', {
  variants: {
    checked: {
      true: 'bg-blue-600',
      false: 'bg-gray-200',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
});

export const Switch: React.FC<SwitchProps> = ({ label, checked, disabled, ...props }) => {
  return (
    <label className="flex items-center">
      <span className="mr-3">{label}</span>
      <input type="checkbox" className="sr-only" checked={checked} disabled={disabled} {...props} />
      <div className={switchStyles({ checked, disabled })}>
        <span
          className={`transform transition ease-in-out duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'} inline-block w-5 h-5 bg-white rounded-full`}
        />
      </div>
    </label>
  );
};
