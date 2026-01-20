import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("bg-white rounded-lg shadow-md transition", {
  variants: {
    hover: {
      true: "hover:shadow-lg"
    }
  },
  defaultVariants: {
    hover: "true"
  }
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, ...props }, ref) => {
    return <div ref={ref} className={cn(variants({ hover }), className)} {...props} />;
  }
);
Card.displayName = "Card";