import React from 'react';
import { cva } from 'class-variance-authority';

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11', {
  variants: {
    size: {
      sm: 'h-4 w-8',
      md: 'h-6 w-11',
      lg: 'h-8 w-14'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

const Switch: React.FC<SwitchProps> = ({ label, className, ...props }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only" {...props} />
      <div className={switchStyles({ className })}>
        <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" />
      </div>
      <span className="ml-3 text-gray-700">{label}</span>
    </label>
  );
};

export default Switch;