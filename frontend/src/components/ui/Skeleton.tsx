import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("bg-gray-200 animate-pulse", {
  variants: {
    shape: {
      rectangle: "",
      circle: "rounded-full"
    },
    size: {
      small: "h-4",
      medium: "h-6",
      large: "h-8"
    }
  },
  defaultVariants: {
    shape: "rectangle",
    size: "medium"
  }
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape, size, ...props }, ref) => {
    return <div ref={ref} className={cn(variants({ shape, size }), className)} {...props} />;
  }
);
Skeleton.displayName = "Skeleton";