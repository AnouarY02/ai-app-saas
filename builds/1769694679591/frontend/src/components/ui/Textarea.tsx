import React from 'react';
import { cva } from 'class-variance-authority';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const textareaStyles = cva('form-textarea mt-1 block w-full text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5');

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return <textarea className={textareaStyles({ className })} {...props} />;
};