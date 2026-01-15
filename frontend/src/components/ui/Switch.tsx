import React from 'react';
import { cva } from 'class-variance-authority';

type SwitchProps = {
  isOn: boolean;
  onToggle: () => void;
  id: string;
};

const switchStyles = cva('relative inline-flex items-center h-6 rounded-full w-11', {
  variants: {
    on: {
      true: 'bg-primary-600',
      false: 'bg-gray-200',
    },
  },
});

const switchButtonStyles = cva('inline-block w-4 h-4 transform bg-white rounded-full', {
  variants: {
    on: {
      true: 'translate-x-6',
      false: 'translate-x-1',
    },
  },
});

export const Switch: React.FC<SwitchProps> = ({ isOn, onToggle, id }) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={onToggle}
      className={switchStyles({ on: isOn })}
    >
      <span className={switchButtonStyles({ on: isOn })} />
    </button>
  );
};