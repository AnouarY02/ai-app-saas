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
        className="fixed inset-0 z-50 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
        {...props}
      >
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
        <div
          ref={ref}
          className={cn("bg-white rounded-lg shadow-lg z-10", className)}
        >
          {children}
          <button onClick={onClose} className="absolute top-0 right-0 m-2">Close</button>
        </div>
      </div>
    ) : null
  )
);
Dialog.displayName = "Dialog";