import React from 'react';
import { cva } from 'class-variance-authority';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      small: 'h-4 w-4',
      medium: 'h-6 w-6',
      large: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const Spinner = React.forwardRef<HTMLDivElement, { size?: 'small' | 'medium' | 'large' }>(({ size }, ref) => {
  return <div ref={ref} className={spinnerVariants({ size })} />;
});

Spinner.displayName = 'Spinner';