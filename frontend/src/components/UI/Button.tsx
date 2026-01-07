import React from 'react';
import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  ...props
}) => (
  <button className={styles[variant]} disabled={loading || props.disabled} {...props}>
    {loading ? 'Loading...' : children}
  </button>
);

export default Button;
