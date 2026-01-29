import React from 'react';
import { cva } from 'class-variance-authority';

const cardVariants = cva('p-4 bg-white shadow-md rounded', {
  variants: {},
  defaultVariants: {},
});

export const Card = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
  return <div ref={ref} className={cardVariants()}>{children}</div>;
});

Card.displayName = 'Card';