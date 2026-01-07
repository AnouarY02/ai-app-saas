import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ loading, children, variant = "primary", ...props }) => {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "..." : children}
    </button>
  );
};

export default Button;
