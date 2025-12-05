import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'btn btn-primary px-4 py-2 rounded font-medium transition',
        className
      )}
      {...props}
    />
  )
);
Button.displayName = 'Button';

