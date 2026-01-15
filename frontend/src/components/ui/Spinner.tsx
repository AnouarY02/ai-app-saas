import React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<SVGElement> {}

export const Spinner = React.forwardRef<SVGElement, SpinnerProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn("animate-spin h-5 w-5 text-[#ed7544]", className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    );
  }
);
Spinner.displayName = "Spinner";