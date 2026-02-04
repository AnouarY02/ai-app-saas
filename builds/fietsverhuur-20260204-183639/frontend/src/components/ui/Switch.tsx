import React from 'react';
import { cn } from '@/lib/utils';
export const Switch = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <button role="switch" ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));