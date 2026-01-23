import React, { forwardRef } from 'react';

interface AlertProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(({ variant, message }, ref) => {
  const variantClasses = {
    success: 'bg-success-600 text-white',
    error: 'bg-error-600 text-white',
    warning: 'bg-yellow-600 text-black',
    info: 'bg-blue-600 text-white',
  };

  return (
    <div ref={ref} className={`p-4 rounded ${variantClasses[variant]}`}>
      {message}
    </div>
  );
});

export default Alert;