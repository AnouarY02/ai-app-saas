import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = "md", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full rounded-md border transition-all duration-300 ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300 focus-visible:ring-[#ed7544]",
          size === "sm" && "h-8 px-2 text-sm",
          size === "md" && "h-10 px-3 text-base",
          size === "lg" && "h-12 px-4 text-lg",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";