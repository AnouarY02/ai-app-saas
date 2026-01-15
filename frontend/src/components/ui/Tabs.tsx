import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: { label: string; content: React.ReactNode }[];
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={cn(
                "px-4 py-2 text-sm font-medium",
                "transition-all duration-300 ease-smooth",
                activeIndex === index
                  ? "border-b-2 border-[#ed7544] text-[#ed7544]"
                  : "text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4">
          {tabs[activeIndex].content}
        </div>
      </div>
    );
  }
);
Tabs.displayName = "Tabs";