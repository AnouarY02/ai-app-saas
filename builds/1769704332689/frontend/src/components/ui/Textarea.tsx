import React from 'react';
import { cva } from 'class-variance-authority';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const textareaStyles = cva('form-textarea mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md');

export const Textarea: React.FC<TextareaProps> = (props) => (
  <textarea className={textareaStyles()} {...props} />
);