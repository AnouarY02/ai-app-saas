import React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="radio"
        className={cn(
          "form-radio h-5 w-5 text-[#ed7544]",
          "transition-all duration-300 ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ed7544]",
          className
        )}
        {...props}
      />
    );
  }
);
Radio.displayName = "Radio";