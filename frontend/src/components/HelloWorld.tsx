import React from 'react';

interface HelloWorldProps {
  name?: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
  return (
    <div className="hello-world">
      <h2>Hello, {name || 'World'}!</h2>
      <p>This is a reusable HelloWorld component.</p>
    </div>
  );
};

export default HelloWorld;
