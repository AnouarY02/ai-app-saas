import React from 'react';
import { cn } from '@/lib/utils';
export const Select = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <select ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));