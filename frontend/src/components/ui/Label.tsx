import React from 'react';

interface LabelProps {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, required, children }) => (
  <label htmlFor={htmlFor} className="block text-primary-700">
    {children}
    {required && <span className="text-red-500"> *</span>}
  </label>
);