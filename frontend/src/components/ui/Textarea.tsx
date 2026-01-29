import React from 'react';
import { cva } from 'class-variance-authority';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const textareaStyles = cva('form-textarea block w-full mt-1', {
  variants: {
    size: {
      sm: 'text-sm py-1',
      md: 'text-base py-2',
      lg: 'text-lg py-3'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return <textarea className={textareaStyles({ className })} {...props} />;
};

export default Textarea;