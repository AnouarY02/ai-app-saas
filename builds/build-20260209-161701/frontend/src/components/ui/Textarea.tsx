import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = (props) => {
  return <textarea className="border rounded-md p-2 w-full" {...props} />;
};

export default Textarea;
