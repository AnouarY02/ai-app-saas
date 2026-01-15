import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, label, children, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        <button
          className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ed7544]"
          onClick={() => setOpen(!open)}
        >
          {label}
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {open && (
          <div
            className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-56"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";