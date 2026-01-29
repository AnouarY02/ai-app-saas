import React, { forwardRef } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ content, children }, ref) => {
  return (
    <div className="relative group" ref={ref}>
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max bg-gray-800 text-white text-sm p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {content}
      </div>
    </div>
  );
});

export default Tooltip;