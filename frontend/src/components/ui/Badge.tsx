import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
}

const Badge: React.FC<BadgeProps> = ({ children, color = 'primary' }) => {
  const colorClasses = color === 'primary' ? 'bg-brand-primary-500' : 'bg-brand-secondary-500';
  return <span className={`text-white px-2 py-1 rounded-full ${colorClasses}`}>{children}</span>;
};

export default Badge;
