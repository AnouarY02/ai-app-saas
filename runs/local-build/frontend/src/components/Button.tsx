import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  ...props
}) => {
  return (
    <button
      className={classNames("btn", `btn-${variant}`)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="spinner" /> : children}
    </button>
  );
};

export default Button;

