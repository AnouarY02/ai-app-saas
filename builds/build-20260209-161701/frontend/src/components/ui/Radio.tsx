import React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Radio: React.FC<RadioProps> = (props) => {
  return <input type="radio" className="form-radio" {...props} />;
};

export default Radio;
