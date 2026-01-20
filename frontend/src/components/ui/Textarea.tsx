import React from 'react';
import { cva } from 'class-variance-authority';

type TextareaProps = {
  id: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

const textareaStyles = cva('form-textarea text-primary-700', {
  variants: {
    filled: {
      true: 'bg-primary-600',
      false: 'bg-white'
    }
  }
});

export const Textarea: React.FC<TextareaProps> = ({ id, value, onChange, placeholder }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      className={textareaStyles({ filled: !!value })}
    />
  );
};