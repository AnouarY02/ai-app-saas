import React, { forwardRef } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  initials: string;
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(({ src, alt, initials }, ref) => {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
      {src ? (
        <img ref={ref} src={src} alt={alt} className="w-full h-full rounded-full" />
      ) : (
        <span className="text-white font-bold">{initials}</span>
      )}
    </div>
  );
});

export default Avatar;