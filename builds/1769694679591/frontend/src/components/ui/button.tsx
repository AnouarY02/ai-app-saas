import React from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva('px-4 py-2 rounded', {
  variants: {
    variant: {
      primary: 'bg-primary-600 text-white',
      secondary: 'bg-gray-600 text-white',
      outline: 'border border-primary-600 text-primary-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const Button = React.forwardRef<HTMLButtonElement, { variant?: 'primary' | 'secondary' | 'outline'; children: React.ReactNode }>(({ variant, children }, ref) => {
  return <button ref={ref} className={buttonVariants({ variant })}>{children}</button>;
});

Button.displayName = 'Button';