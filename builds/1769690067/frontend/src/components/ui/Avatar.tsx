import React, { forwardRef } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  initials: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ src, alt, initials }, ref) => {
  return (
    <div ref={ref} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full rounded-full" />
      ) : (
        <span className="text-gray-700">{initials}</span>
      )}
    </div>
  );
});

export default Avatar;