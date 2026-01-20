import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: string;
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, fallback, alt, ...props }, ref) => (
    <div className="relative inline-block">
      {src ? (
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn("rounded-full", className)}
          {...props}
        />
      ) : (
        <span className="inline-block bg-gray-300 text-gray-700 rounded-full p-2">
          {fallback}
        </span>
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";