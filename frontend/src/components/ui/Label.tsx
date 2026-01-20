import React from 'react';

type LabelProps = {
  htmlFor: string;
  text: string;
  required?: boolean;
};

export const Label: React.FC<LabelProps> = ({ htmlFor, text, required = false }) => {
  return (
    <label htmlFor={htmlFor} className="text-primary-700">
      {text}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
};