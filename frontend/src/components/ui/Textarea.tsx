import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = (props) => (
  <textarea
    className="form-textarea mt-1 block w-full text-primary-700 bg-white border border-primary-700"
    {...props}
  />
);