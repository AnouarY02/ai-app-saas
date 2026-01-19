import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max, ...props }, ref) => {
    const percentage = (value / max) * 100;

    return (
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
          style={{ width: `${percentage}%` }}
        >
          {Math.round(percentage)}%
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";