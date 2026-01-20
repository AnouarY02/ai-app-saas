import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("animate-spin rounded-full border-t-2 border-primary-600", {
  variants: {
    size: {
      small: "w-4 h-4",
      medium: "w-6 h-6",
      large: "w-8 h-8"
    }
  },
  defaultVariants: {
    size: "medium"
  }
});

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variants> {}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, ...props }, ref) => {
    return <div ref={ref} className={cn(variants({ size }), className)} {...props} />;
  }
);
Spinner.displayName = "Spinner";