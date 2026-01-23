import React from 'react';
import { cva } from 'class-variance-authority';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11');
const switchInputStyles = cva('sr-only');
const switchSpanStyles = cva('inline-block w-4 h-4 transform bg-white rounded-full transition-transform');

const Switch: React.FC<SwitchProps> = ({ className, ...props }) => {
  return (
    <label className={switchStyles({ className })}>
      <input type="checkbox" className={switchInputStyles()} {...props} />
      <span className={switchSpanStyles()} />
    </label>
  );
};

export default Switch;