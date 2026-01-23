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

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'rectangle' | 'circle';
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ shape, className, ...props }, ref) => {
  return <div ref={ref} className={skeletonVariants({ shape, className })} {...props} />;
});

Skeleton.displayName = 'Skeleton';
