import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-600", className)}
        {...props}
      />
    );
  }
);
Spinner.displayName = "Spinner";