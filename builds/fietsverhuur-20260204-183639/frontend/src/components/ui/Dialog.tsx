import React from 'react';
import { cn } from '@/lib/utils';
export const Dialog = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <div role="dialog" ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));