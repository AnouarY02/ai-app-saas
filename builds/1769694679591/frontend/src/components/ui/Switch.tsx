import React from 'react';
import { cva } from 'class-variance-authority';

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11');
const switchInputStyles = cva('opacity-0 w-0 h-0');
const switchSliderStyles = cva('absolute left-0 top-0 bottom-0 right-0 bg-gray-200 rounded-full transition-transform duration-200 ease-in-out', {
  variants: {
    checked: {
      true: 'bg-blue-600',
      false: 'bg-gray-200'
    }
  }
});
const switchCircleStyles = cva('absolute left-0 top-0 bottom-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out', {
  variants: {
    checked: {
      true: 'translate-x-5',
      false: 'translate-x-0'
    }
  }
});

export const Switch: React.FC<SwitchProps> = ({ label, className, checked, ...props }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <span className="mr-3">{label}</span>
      <div className={switchStyles({ className })}>
        <input type="checkbox" className={switchInputStyles()} checked={checked} {...props} />
        <span className={switchSliderStyles({ checked })} />
        <span className={switchCircleStyles({ checked })} />
      </div>
    </label>
  );
};