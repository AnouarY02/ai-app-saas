import React from 'react';
import styles from './FormField.module.css';

type FormFieldProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
};

const FormField: React.FC<FormFieldProps> = ({ label, type = 'text', name, value, onChange, error, autoComplete }) => (
  <div className={styles.field}>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className={error ? styles.errorInput : ''}
    />
    {error && <div className={styles.errorMsg}>{error}</div>}
  </div>
);

export default FormField;
