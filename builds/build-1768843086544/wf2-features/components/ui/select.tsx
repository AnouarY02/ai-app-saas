import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={
        "border border-input bg-background px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 " +
        (className || "")
      }
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";
