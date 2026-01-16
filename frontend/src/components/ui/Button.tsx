import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 text-white hover:bg-primary-700",
        secondary: "bg-secondary-600 text-white hover:bg-secondary-700",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
        ghost: "text-gray-700 hover:bg-gray-100"
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Spinner className="mr-2" />}
        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";