import React from 'react';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch: React.FC<SwitchProps> = (props) => {
  return <input type="checkbox" className="form-switch" {...props} />;
};

export default Switch;
