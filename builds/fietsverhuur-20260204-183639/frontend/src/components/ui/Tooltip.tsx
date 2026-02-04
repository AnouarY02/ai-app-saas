import React from 'react';
import { cn } from '@/lib/utils';
export const Tooltip = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <div role="tooltip" ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));