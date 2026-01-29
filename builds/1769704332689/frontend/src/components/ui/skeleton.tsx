import React from 'react';
import { cva } from 'class-variance-authority';

const skeletonVariants = cva('bg-gray-300 animate-pulse', {
  variants: {
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    shape: 'square',
    size: 'md',
  },
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'circle' | 'square';
  size?: 'sm' | 'md' | 'lg';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ shape, size, className, ...props }, ref) => {
  return <div ref={ref} className={`${skeletonVariants({ shape, size })} ${className}`} {...props} />;
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
