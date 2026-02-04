import React from 'react';
import { cn } from '@/lib/utils';
export const Label = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <label ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));