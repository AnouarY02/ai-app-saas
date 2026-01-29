import React, { forwardRef } from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({ progress }, ref) => {
  return (
    <div className="w-full bg-gray-200 rounded">
      <div
        ref={ref}
        className="bg-blue-600 text-xs leading-none py-1 text-center text-white rounded"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
});

export default ProgressBar;