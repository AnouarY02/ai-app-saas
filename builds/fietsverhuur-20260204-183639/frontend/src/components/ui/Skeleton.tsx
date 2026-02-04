import React from 'react';
import { cn } from '@/lib/utils';
export const Skeleton = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <div ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));