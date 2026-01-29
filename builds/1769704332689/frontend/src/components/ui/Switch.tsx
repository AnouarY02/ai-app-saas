import React from 'react';
import { cva } from 'class-variance-authority';

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11');
const switchInputStyles = cva('sr-only');
const switchSliderStyles = cva('inline-block w-6 h-6 transform bg-white rounded-full transition-transform');

export const Switch: React.FC<SwitchProps> = ({ label, ...props }) => (
  <label className="flex items-center cursor-pointer">
    <span className="mr-3 text-gray-700">{label}</span>
    <div className={switchStyles()}>
      <input type="checkbox" className={switchInputStyles()} {...props} />
      <span className={switchSliderStyles()}></span>
    </div>
  </label>
);