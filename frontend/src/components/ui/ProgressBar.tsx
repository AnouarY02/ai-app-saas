import React, { forwardRef } from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({ progress }, ref) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        ref={ref}
        className="bg-blue-600 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

export default ProgressBar;