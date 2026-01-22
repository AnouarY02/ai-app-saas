import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <textarea className="form-textarea mt-1 block w-full bg-white border border-gray-300 text-primary-700" {...props} />
  );
};