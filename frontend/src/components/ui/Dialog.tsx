import React from "react";
import { cn } from "@/lib/utils";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, open, onClose, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          "transition-opacity duration-300 ease-smooth",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
          className
        )}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden z-10"
        >
          {children}
        </div>
      </div>
    );
  }
);
Dialog.displayName = "Dialog";