import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'red' | 'green' | 'blue';
}

const Badge: React.FC<BadgeProps> = ({ children, color = 'blue' }) => {
  const colorClasses = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
  };

  return (
    <span className={`text-white px-2 py-1 rounded ${colorClasses[color]}`}>
      {children}
    </span>
  );
};

export default Badge;