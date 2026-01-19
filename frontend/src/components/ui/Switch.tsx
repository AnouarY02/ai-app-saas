import React from 'react';
import { cva } from 'class-variance-authority';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-gray-200'
    }
  }
});

export const Switch: React.FC<SwitchProps> = ({ checked, ...props }) => (
  <label className="flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only" checked={checked} {...props} />
    <div className={switchStyles({ checked })}>
      <span
        className={`transform transition ease-in-out duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 bg-white rounded-full`}
      />
    </div>
  </label>
);