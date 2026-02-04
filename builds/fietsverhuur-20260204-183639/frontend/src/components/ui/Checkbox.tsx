import React from 'react';
import { cn } from '@/lib/utils';
export const Checkbox = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <input type="checkbox" ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));