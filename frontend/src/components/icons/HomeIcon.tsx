import React from 'react';

export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10.75L12 4l9 6.75M4.5 10.75V19a2 2 0 002 2h2.75a.75.75 0 00.75-.75v-3.5A.75.75 0 0110.75 16h2.5a.75.75 0 01.75.75v3.5a.75.75 0 00.75.75H19a2 2 0 002-2v-8.25"
    />
  </svg>
);
