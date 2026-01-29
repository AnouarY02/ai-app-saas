import React from 'react';
import { cva } from 'class-variance-authority';

const cardVariants = cva('p-4 bg-white shadow-md rounded-md', {
  variants: {},
  defaultVariants: {},
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={`${cardVariants()} ${className}`} {...props} />;
});

Card.displayName = 'Card';

export default Card;
