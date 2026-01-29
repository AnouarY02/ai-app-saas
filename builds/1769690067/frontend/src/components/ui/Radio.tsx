import React from 'react';
import { cva } from 'class-variance-authority';

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const radioStyles = cva('form-radio h-5 w-5 text-blue-600', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: ''
    }
  }
});

const Radio: React.FC<RadioProps> = ({ label, disabled, ...props }) => {
  return (
    <label className="inline-flex items-center">
      <input type="radio" className={radioStyles({ disabled })} disabled={disabled} {...props} />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default Radio;