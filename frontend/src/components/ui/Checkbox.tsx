import React, { useState } from 'react';
import { cva } from 'class-variance-authority';

type CheckboxProps = {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const checkboxStyles = cva('form-checkbox h-5 w-5 text-primary-700', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-white'
    }
  }
});

export const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className={checkboxStyles({ checked: isChecked })}
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={id} className="ml-2 text-primary-700">
        {label}
      </label>
    </div>
  );
};