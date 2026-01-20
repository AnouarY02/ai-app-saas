import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: string;
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, fallback, alt, ...props }, ref) => (
    <img
      ref={ref}
      src={src}
      alt={alt || fallback}
      className={cn("rounded-full", className)}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = `https://via.placeholder.com/150?text=${fallback}`;
      }}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";