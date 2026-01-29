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
        <button onClick={onClose} className="absolute top-2 right-2">Close</button>
        {children}
      </div>
    </div>
  );
});

export default Dialog;