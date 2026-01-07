import React from 'react';
import HelloWorld from '../components/HelloWorld';

const HelloWorldPage: React.FC = () => {
  return (
    <section>
      <h1>Hello World Demo</h1>
      <HelloWorld name="AI SaaS" />
    </section>
  );
};

export default HelloWorldPage;
