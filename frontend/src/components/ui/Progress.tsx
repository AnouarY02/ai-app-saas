import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max, ...props }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("relative w-full h-4 bg-gray-200 rounded", className)}
      {...props}
    >
      <div
        className="absolute top-0 left-0 h-full bg-success-600 rounded"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  )
);
Progress.displayName = "Progress";