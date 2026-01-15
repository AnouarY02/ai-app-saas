import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max(value / max * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={cn("w-full bg-gray-200 rounded-full h-4", className)}
        {...props}
      >
        <div
          className="bg-[#ed7544] h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";