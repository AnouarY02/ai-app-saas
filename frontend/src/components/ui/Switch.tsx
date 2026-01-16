import React from 'react';
import { cva } from 'class-variance-authority';

type SwitchProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11', {
  variants: {
    checked: {
      true: 'bg-primary-600',
      false: 'bg-gray-200',
    },
  },
});

const Switch: React.FC<SwitchProps> = ({ id, checked, onChange }) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={switchStyles({ checked })}
    >
      <span
        className={`transform transition ease-in-out duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 bg-white rounded-full`}
      />
    </button>
  );
};

export default Switch;