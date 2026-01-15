import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', children, ...props }, ref) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none focus:ring-2';
  const variantStyles = variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white';

  return (
    <button ref={ref} className={`${baseStyles} ${variantStyles}`} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;