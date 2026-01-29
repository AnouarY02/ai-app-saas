import React from 'react';

type LabelProps = {
  htmlFor: string;
  text: string;
  required?: boolean;
};

export const Label: React.FC<LabelProps> = ({ htmlFor, text, required }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {text}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
};