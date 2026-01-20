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
      className={cn("w-full bg-gray-200 rounded-full", className)}
      {...props}
    >
      <div
        className="bg-blue-600 text-center text-white rounded-full"
        style={{ width: `${(value / max) * 100}%` }}
      >
        {Math.round((value / max) * 100)}%
      </div>
    </div>
  )
);
Progress.displayName = "Progress";