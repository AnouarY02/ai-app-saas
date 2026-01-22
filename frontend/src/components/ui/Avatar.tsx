import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: string;
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, fallback, alt, ...props }, ref) => (
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
        <span className="flex items-center justify-center w-full h-full text-lg font-semibold text-gray-700">
          {fallback}
        </span>
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";