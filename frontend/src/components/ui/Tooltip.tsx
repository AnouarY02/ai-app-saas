import * as React from "react";
import { cn } from "@/lib/utils";

const tooltipVariants = cva("absolute bg-black text-white text-sm p-2 rounded", {
  variants: {
    position: {
      top: "bottom-full mb-2",
      right: "left-full ml-2",
      bottom: "top-full mt-2",
      left: "right-full mr-2"
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