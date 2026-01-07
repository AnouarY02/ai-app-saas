import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = "text", value, onChange, error, autoComplete, placeholder }) => (
  <div className="form-field">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className={error ? "input error" : "input"}
    />
    {error && <div className="form-error">{error}</div>}
  </div>
);

export default FormField;
