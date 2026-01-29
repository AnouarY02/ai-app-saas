import React from 'react';
import { cva } from 'class-variance-authority';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

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

const Switch: React.FC<SwitchProps> = ({ checked, disabled, ...props }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only" checked={checked} disabled={disabled} {...props} />
      <div className={switchStyles({ checked, disabled })}>
        <span
          className={`transform transition ease-in-out duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 bg-white rounded-full`}
        />
      </div>
    </label>
  );
};

export default Switch;