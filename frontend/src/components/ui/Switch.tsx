import React from 'react';
import { cva } from 'class-variance-authority';

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11', {
  variants: {
    checked: {
      true: 'bg-blue-600',
      false: 'bg-gray-200'
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: ''
    }
  }
});

const switchButtonStyles = cva('inline-block w-4 h-4 transform bg-white rounded-full transition-transform', {
  variants: {
    checked: {
      true: 'translate-x-6',
      false: 'translate-x-1'
    }
  }
});

export const Switch: React.FC<SwitchProps> = ({ label, checked, disabled, ...props }) => {
  return (
    <label className="flex items-center">
      <span className="mr-3 text-gray-700">{label}</span>
      <div className={switchStyles({ checked, disabled })}>
        <input type="checkbox" className="opacity-0 w-0 h-0" checked={checked} disabled={disabled} {...props} />
        <span className={switchButtonStyles({ checked })}></span>
      </div>
    </label>
  );
};