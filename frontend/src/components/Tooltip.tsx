import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-sm rounded py-1 px-2">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;