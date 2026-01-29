import React from 'react';
import { cva } from 'class-variance-authority';

const skeletonVariants = cva('bg-gray-300 animate-pulse', {
  variants: {
    shape: {
      rectangle: 'h-4 w-full',
      circle: 'rounded-full h-10 w-10',
    },
  },
  defaultVariants: {
    shape: 'rectangle',
  },
});

export const Skeleton = React.forwardRef<HTMLDivElement, { shape?: 'rectangle' | 'circle' }>(({ shape }, ref) => {
  return <div ref={ref} className={skeletonVariants({ shape })} />;
});

Skeleton.displayName = 'Skeleton';