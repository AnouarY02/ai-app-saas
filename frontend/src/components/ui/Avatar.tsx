import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg";
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn(
          "rounded-full",
          size === "sm" && "h-8 w-8",
          size === "md" && "h-12 w-12",
          size === "lg" && "h-16 w-16",
          className
        )}
        {...props}
      />
    );
  }
);
Avatar.displayName = "Avatar";