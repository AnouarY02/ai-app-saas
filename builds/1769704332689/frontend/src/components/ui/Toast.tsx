import React, { forwardRef } from 'react';

interface ToastProps {
  message: string;
  variant: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(({ message, variant, onClose }, ref) => {
  const variantClasses = {
    success: 'bg-success-600',
    error: 'bg-error-600',
    info: 'bg-blue-600',
  };

  return (
    <div ref={ref} className={`fixed bottom-4 right-4 p-4 text-white ${variantClasses[variant]} rounded shadow-lg`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">Close</button>
      </div>
    </div>
  );
});

export default Toast;