import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, required, ...props }) => {
  return (
    <label className="block text-primary-700" {...props}>
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
};