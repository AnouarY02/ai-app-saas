import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 font-medium rounded-md',
        variant === 'primary' ? 'bg-brand-primary-500 text-white' : 'bg-brand-secondary-500 text-white',
        className
      )}
      {...props}
    />
  );
};

export default Button;
