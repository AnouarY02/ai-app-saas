import React from 'react';
import { cva } from 'class-variance-authority';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const textareaStyles = cva('form-textarea block w-full mt-1', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: ''
    }
  }
});

const Textarea: React.FC<TextareaProps> = ({ disabled, ...props }) => {
  return (
    <textarea className={textareaStyles({ disabled })} disabled={disabled} {...props} />
  );
};

export default Textarea;