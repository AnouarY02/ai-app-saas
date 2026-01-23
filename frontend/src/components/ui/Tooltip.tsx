import React, { forwardRef } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ content, children }, ref) => {
  return (
    <div className="relative inline-block" ref={ref}>
      {children}
      <div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-sm p-2 rounded shadow-lg">
        {content}
      </div>
    </div>
  );
});

export default Tooltip;