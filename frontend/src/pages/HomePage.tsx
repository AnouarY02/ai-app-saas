import React from 'react';
import ExampleComponent from '../components/ExampleComponent';

const HomePage: React.FC = () => {
  return (
    <section>
      <h1>Welcome to AI App</h1>
      <p>This is the landing page of your AI App. Explore the navigation to learn more.</p>
      <ExampleComponent />
    </section>
  );
};

export default HomePage;
