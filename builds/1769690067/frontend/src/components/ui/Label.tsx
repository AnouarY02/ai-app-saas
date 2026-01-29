import React from 'react';
import { cva } from 'class-variance-authority';

type LabelProps = {
  text: string;
  required?: boolean;
};

const labelStyles = cva('block text-sm font-medium text-gray-700', {
  variants: {
    required: {
      true: 'after:content-["*"] after:ml-0.5 after:text-red-500',
      false: ''
    }
  }
});

const Label: React.FC<LabelProps> = ({ text, required = false }) => {
  return <label className={labelStyles({ required })}>{text}</label>;
};

export default Label;