import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  onClose: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, duration = 5000, onClose, children, ...props }, ref) => {
    React.useEffect(() => {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
      <div
        ref={ref}
        role="status"
        className={cn("fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg", className)}
        {...props}
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-white"
        >
          &times;
        </button>
        {children}
      </div>
    );
  }
);
Toast.displayName = "Toast";