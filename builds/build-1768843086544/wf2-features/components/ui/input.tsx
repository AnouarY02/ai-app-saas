import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={
        "border border-input bg-background px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 " +
        (className || "")
      }
      {...props}
    />
  )
);
Input.displayName = "Input";
