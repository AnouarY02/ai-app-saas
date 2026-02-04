import React from 'react';
import { cn } from '@/lib/utils';
export const Button = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <button ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));