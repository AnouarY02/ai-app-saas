import React from 'react';
import './HelloWorld.css';

interface HelloWorldProps {
  name?: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
  return (
    <div className="hello-world">
      <h2>Hello, {name || 'World'}!</h2>
      <p>Welcome to the AI App. 🚀</p>
    </div>
  );
};

export default HelloWorld;