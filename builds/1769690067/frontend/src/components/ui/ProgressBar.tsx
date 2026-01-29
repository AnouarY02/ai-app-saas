import React, { forwardRef } from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({ progress }, ref) => {
  return (
    <div className="w-full bg-gray-200 rounded">
      <div
        ref={ref}
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
});

export default ProgressBar;