import React from "react";
import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "error" | "warning" | "info";
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "p-4 rounded-lg flex items-start",
          "transition-all duration-300 ease-smooth",
          variant === "success" && "bg-green-100 text-green-800",
          variant === "error" && "bg-red-100 text-red-800",
          variant === "warning" && "bg-yellow-100 text-yellow-800",
          variant === "info" && "bg-blue-100 text-blue-800",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Alert.displayName = "Alert";