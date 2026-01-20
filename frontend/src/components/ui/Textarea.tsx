import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <textarea className="form-textarea text-primary-700 bg-white border border-primary-600" {...props} />
  );
};