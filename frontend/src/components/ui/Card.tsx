import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";