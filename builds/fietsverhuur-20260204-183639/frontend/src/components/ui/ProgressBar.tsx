import React from 'react';
import { cn } from '@/lib/utils';
export const ProgressBar = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <div role="progressbar" ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));