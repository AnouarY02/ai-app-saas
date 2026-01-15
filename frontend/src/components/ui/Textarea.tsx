import React from 'react';
import { cva } from 'class-variance-authority';

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  id: string;
  rows?: number;
};

const textareaStyles = cva('form-textarea text-primary-700', {
  variants: {
    base: 'bg-white border border-primary-600',
  },
});

export const Textarea: React.FC<TextareaProps> = ({ value, onChange, id, rows = 4 }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={textareaStyles()}
      aria-labelledby={id}
    />
  );
};