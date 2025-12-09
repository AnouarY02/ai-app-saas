import React from 'react';
import styles from './FormField.module.css';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text', value, onChange, autoComplete, error, required }) => (
  <div className={styles.field}>
    <label htmlFor={name} className={styles.label}>{label}{required && <span className={styles.required}>*</span>}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      required={required}
      className={styles.input + (error ? ' ' + styles.inputError : '')}
    />
    {error && <div className={styles.error}>{error}</div>}
  </div>
);

export default FormField;

