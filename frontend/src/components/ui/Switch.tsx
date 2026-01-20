import React, { useState } from 'react';
import { cva } from 'class-variance-authority';

type SwitchProps = {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-gray-200'
    }
  }
});

const switchButtonStyles = cva('inline-block w-4 h-4 transform bg-white rounded-full', {
  variants: {
    checked: {
      true: 'translate-x-6',
      false: 'translate-x-1'
    }
  }
});

export const Switch: React.FC<SwitchProps> = ({ id, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleChange}
      className={switchStyles({ checked: isChecked })}
    >
      <span className={switchButtonStyles({ checked: isChecked })} />
    </button>
  );
};