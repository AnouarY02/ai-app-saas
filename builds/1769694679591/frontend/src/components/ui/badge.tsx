import React from 'react';
import { cva } from 'class-variance-authority';

const badgeVariants = cva('px-2 py-1 text-xs font-semibold rounded-full', {
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

export const Badge = React.forwardRef<HTMLSpanElement, { status?: 'success' | 'warning' | 'error'; children: React.ReactNode }>(({ status, children }, ref) => {
  return <span ref={ref} className={badgeVariants({ status })}>{children}</span>;
});

Badge.displayName = 'Badge';