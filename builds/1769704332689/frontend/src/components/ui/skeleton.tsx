import React from 'react';
import { cva } from 'class-variance-authority';

const skeletonVariants = cva('bg-gray-300 animate-pulse', {
  variants: {
    shape: {
      circle: 'rounded-full',
      rectangle: 'rounded',
    },
  },
  defaultVariants: {
    shape: 'rectangle',
  },
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'circle' | 'rectangle';
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ shape, className, ...props }, ref) => {
  return <div ref={ref} className={`${skeletonVariants({ shape })} ${className}`} {...props} />;
});

Skeleton.displayName = 'Skeleton';
