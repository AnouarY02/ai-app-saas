import React from 'react';
import { cn } from '@/lib/utils';
export const Radio = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <input type="radio" ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));