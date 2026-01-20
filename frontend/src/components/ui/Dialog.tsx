import * as React from "react";
import { cn } from "@/lib/utils";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, isOpen, onClose, children, ...props }, ref) => (
    isOpen ? (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn("bg-white rounded-lg shadow-lg", className)}
          onClick={e => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    ) : null
  )
);
Dialog.displayName = "Dialog";