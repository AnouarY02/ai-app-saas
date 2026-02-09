import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<SelectProps> = (props) => {
  return <select className="border rounded-md p-2 w-full" {...props} />;
};

export default Select;
