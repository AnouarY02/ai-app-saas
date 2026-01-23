import React from 'react';
import { cva } from 'class-variance-authority';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const textareaStyles = cva('form-textarea mt-1 block w-full', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
});

export const Textarea: React.FC<TextareaProps> = ({ disabled, ...props }) => {
  return <textarea className={textareaStyles({ disabled })} disabled={disabled} {...props} />;
};
