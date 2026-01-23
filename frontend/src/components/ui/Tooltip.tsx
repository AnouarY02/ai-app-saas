import React, { forwardRef } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ text, children }, ref) => {
  return (
    <div className="relative group" ref={ref}>
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded">
        {text}
      </div>
    </div>
  );
});

export default Tooltip;