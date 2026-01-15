import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium",
          "transition-all duration-300 ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "primary" && "bg-[#ed7544] text-white hover:bg-[#d96a3f] focus-visible:ring-[#ed7544]",
          variant === "secondary" && "bg-[#64748b] text-white hover:bg-[#56677a]",
          variant === "outline" && "border border-[#ed7544] text-[#ed7544] hover:bg-[#ed7544] hover:text-white",
          variant === "ghost" && "text-[#ed7544] hover:bg-[#f3f4f6]",
          size === "sm" && "h-8 px-3 text-sm",
          size === "md" && "h-10 px-4 text-base",
          size === "lg" && "h-12 px-6 text-lg",
          className
        )}
        {...props}
      >
        {loading && <Spinner className="mr-2" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";