import React, { forwardRef } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(({ message, onClose }, ref) => {
  return (
    <div ref={ref} className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">Close</button>
      </div>
    </div>
  );
});

export default Toast;