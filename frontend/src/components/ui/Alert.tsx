import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const alertVariants = cva("p-4 rounded-md", {
  variants: {
    variant: {
      success: "bg-success-600 text-white",
      error: "bg-error-600 text-white",
      warning: "bg-warning-600 text-black",
      info: "bg-info-600 text-white"
    }
  },
  defaultVariants: {
    variant: "info"
  }
});

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = "Alert";