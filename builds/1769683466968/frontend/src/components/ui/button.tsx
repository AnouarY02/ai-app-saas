import React from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva('px-4 py-2 font-semibold rounded', {
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant, className, ...props }, ref) => {
  return <button ref={ref} className={`${buttonVariants({ variant })} ${className}`} {...props} />;
});
Button.displayName = 'Button';
