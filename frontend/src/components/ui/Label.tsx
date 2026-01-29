import React from 'react';
import { cva } from 'class-variance-authority';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

const labelStyles = cva('block text-sm font-medium text-gray-700', {
  variants: {
    required: {
      true: 'after:content-["*"] after:ml-0.5 after:text-red-500',
      false: ''
    }
  },
  defaultVariants: {
    required: false
  }
});

const Label: React.FC<LabelProps> = ({ children, required, className, ...props }) => {
  return (
    <label className={labelStyles({ required, className })} {...props}>
      {children}
    </label>
  );
};

export default Label;