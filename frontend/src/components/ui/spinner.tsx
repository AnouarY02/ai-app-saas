import React from 'react';
import { cva } from 'class-variance-authority';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({ size, className, ...props }, ref) => {
  return <div ref={ref} className={`${spinnerVariants({ size })} ${className}`} {...props} />;
});

Spinner.displayName = 'Spinner';

export default Spinner;
