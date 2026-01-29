import React, { forwardRef } from 'react';

interface AlertProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(({ variant, message }, ref) => {
  const variantClasses = {
    success: 'bg-success-600',
    error: 'bg-error-600',
    warning: 'bg-yellow-600',
    info: 'bg-blue-600',
  };

  return (
    <div ref={ref} className={`p-4 text-white ${variantClasses[variant]}`}>
      {message}
    </div>
  );
});

export default Alert;