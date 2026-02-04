import React from 'react';
import { cn } from '@/lib/utils';
export const Spinner = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <div role="status" ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));