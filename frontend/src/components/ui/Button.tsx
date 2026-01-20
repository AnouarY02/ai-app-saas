import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./Spinner";

const variants = cva("inline-flex items-center justify-center font-medium transition", {
  variants: {
    variant: {
      primary: "bg-primary-600 text-white hover:bg-primary-700",
      secondary: "bg-secondary-600 text-white hover:bg-secondary-700",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
      ghost: "text-gray-700 hover:bg-gray-100"
    },
    size: {
      small: "px-2 py-1 text-sm",
      medium: "px-4 py-2",
      large: "px-6 py-3 text-lg"
    },
    loading: {
      true: "opacity-50 cursor-not-allowed"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "medium"
  }
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> {
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(variants({ variant, size, loading: isLoading }), className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Spinner size="small" className="mr-2" />}
        {icon && !isLoading && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";