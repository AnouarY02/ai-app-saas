import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("block w-full border rounded-md transition", {
  variants: {
    size: {
      small: "px-2 py-1 text-sm",
      medium: "px-3 py-2",
      large: "px-4 py-3 text-lg"
    },
    error: {
      true: "border-error-600 text-error-700",
      false: "border-gray-300 text-gray-700"
    }
  },
  defaultVariants: {
    size: "medium",
    error: "false"
  }
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof variants> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, hasError, ...props }, ref) => {
    return <input ref={ref} className={cn(variants({ size, error: hasError }), className)} {...props} />;
  }
);
Input.displayName = "Input";