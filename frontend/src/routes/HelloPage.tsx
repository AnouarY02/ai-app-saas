import React from 'react';
import HelloWorld from '../components/HelloWorld';

const HelloPage: React.FC = () => {
  return (
    <section>
      <HelloWorld name="from the Hello route" />
    </section>
  );
};

export default HelloPage;