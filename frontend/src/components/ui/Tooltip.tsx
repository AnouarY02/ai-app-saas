import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tooltipVariants = cva("absolute p-2 bg-black text-white rounded", {
  variants: {
    position: {
      top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
      right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
      bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
      left: "right-full top-1/2 transform -translate-y-1/2 mr-2"
    }
  },
  defaultVariants: {
    position: "top"
  }
});

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tooltipVariants> {}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, position, children, ...props }, ref) => (
    <div
      ref={ref}
      role="tooltip"
      className={cn(tooltipVariants({ position }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
Tooltip.displayName = "Tooltip";