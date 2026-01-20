import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva("block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-600 focus:border-primary-600", {
  variants: {
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-2",
      lg: "px-4 py-3 text-lg"
    },
    error: {
      true: "border-error-600",
      false: ""
    }
  },
  defaultVariants: {
    size: "md",
    error: "false"
  }
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ size, error }), className)}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";