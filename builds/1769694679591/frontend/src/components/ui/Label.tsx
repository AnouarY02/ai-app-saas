import React from 'react';
import { cva } from 'class-variance-authority';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

const labelStyles = cva('block text-sm font-medium text-gray-700');

export const Label: React.FC<LabelProps> = ({ children, required, className, ...props }) => {
  return (
    <label className={labelStyles({ className })} {...props}>
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
};