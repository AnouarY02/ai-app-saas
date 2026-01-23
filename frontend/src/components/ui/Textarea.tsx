import React from 'react';
import { cva } from 'class-variance-authority';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const textareaStyles = cva('form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50');

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return <textarea className={textareaStyles({ className })} {...props} />;
};

export default Textarea;