import React from 'react';
import { cva } from 'class-variance-authority';

const badgeVariants = cva('px-2 py-1 text-sm rounded-full', {
  variants: {
    status: {
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-600 text-white',
      error: 'bg-red-600 text-white',
    },
  },
  defaultVariants: {
    status: 'success',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'success' | 'warning' | 'error';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ status, className, ...props }, ref) => {
  return <span ref={ref} className={`${badgeVariants({ status })} ${className}`} {...props} />;
});

Badge.displayName = 'Badge';

export default Badge;
