import React from 'react';
import { cva } from 'class-variance-authority';

const inputVariants = cva('px-3 py-2 border rounded-md', {
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

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ error, className, ...props }, ref) => {
  return <input ref={ref} className={`${inputVariants({ error: error ? 'true' : 'false' })} ${className}`} {...props} />;
});

Input.displayName = 'Input';

export default Input;
