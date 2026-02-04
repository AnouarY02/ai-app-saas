import React from 'react';
import { cn } from '@/lib/utils';
export const Textarea = React.forwardRef(({ variant='default', className, ...props }, ref) => (
  <textarea ref={ref} className={cn('base', variant && `variant-${variant}`, className)} {...props} />
));