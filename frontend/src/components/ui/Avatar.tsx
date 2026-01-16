import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  initials: string;
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, initials, alt, ...props }, ref) => (
    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
      {src ? (
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover", className)}
          {...props}
        />
      ) : (
        <span className="flex items-center justify-center h-full text-lg font-medium text-gray-700">
          {initials}
        </span>
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";