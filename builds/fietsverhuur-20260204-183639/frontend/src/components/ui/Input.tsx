import React from 'react';
import { cn } from '@/lib/utils';
export const Input = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <input ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));