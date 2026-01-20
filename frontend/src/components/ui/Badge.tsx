import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium", {
  variants: {
    variant: {
      primary: "bg-primary-600 text-white",
      secondary: "bg-secondary-600 text-white",
      success: "bg-success-600 text-white",
      warning: "bg-yellow-600 text-white",
      error: "bg-error-600 text-white"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof variants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return <span ref={ref} className={cn(variants({ variant }), className)} {...props} />;
  }
);
Badge.displayName = "Badge";