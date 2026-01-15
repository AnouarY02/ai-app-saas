import React, { useState } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {label}
      </button>
      {isOpen && (
        <ul className="absolute bg-white border rounded mt-2">
          {options.map((option, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-200">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;