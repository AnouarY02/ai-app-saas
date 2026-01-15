import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:border-blue-500"
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;