import React from 'react';
import { cn } from '@/lib/utils';
export const Badge = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <span ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));