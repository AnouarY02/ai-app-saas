import React from 'react';
import { cva } from 'class-variance-authority';

type LabelProps = {
  htmlFor: string;
  text: string;
  required?: boolean;
};

const labelStyles = cva('block text-sm font-medium text-gray-700');
const requiredIndicatorStyles = cva('text-red-500');

export const Label: React.FC<LabelProps> = ({ htmlFor, text, required }) => (
  <label htmlFor={htmlFor} className={labelStyles()}>
    {text}
    {required && <span className={requiredIndicatorStyles()}> *</span>}
  </label>
);