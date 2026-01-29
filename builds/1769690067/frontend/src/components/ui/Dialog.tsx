import React, { forwardRef } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog = forwardRef<HTMLDivElement, DialogProps>(({ isOpen, onClose, children }, ref) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={ref} className="bg-white p-6 rounded shadow-lg">
        {children}
        <button onClick={onClose} className="mt-4 bg-red-600 text-white p-2 rounded">Close</button>
      </div>
    </div>
  );
});

export default Dialog;