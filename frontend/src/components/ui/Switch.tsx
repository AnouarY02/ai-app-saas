import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        className={cn(
          "relative inline-flex items-center h-6 rounded-full w-11",
          "transition-all duration-300 ease-smooth",
          isChecked ? "bg-[#ed7544]" : "bg-gray-200",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "inline-block w-4 h-4 transform bg-white rounded-full",
            "transition-transform duration-300 ease-smooth",
            isChecked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";