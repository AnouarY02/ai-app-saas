import React from 'react';
import { cva } from 'class-variance-authority';

const inputVariants = cva('px-3 py-2 border rounded', {
  variants: {
    error: {
      true: 'border-red-600',
      false: 'border-gray-300',
    },
  },
  defaultVariants: {
    error: 'false',
  },
});

export const Input = React.forwardRef<HTMLInputElement, { error?: boolean; placeholder?: string }>(({ error, placeholder }, ref) => {
  return <input ref={ref} className={inputVariants({ error: error ? 'true' : 'false' })} placeholder={placeholder} />;
});

Input.displayName = 'Input';