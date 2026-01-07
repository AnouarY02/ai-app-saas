import React from 'react';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to AI App</h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-xl">
        This is a minimal AI SaaS starter. The app is ready for future expansion with a modern stack: React, TypeScript, Vite, and TailwindCSS.
      </p>
      <Button variant="primary">Get Started</Button>
    </section>
  );
};

export default HomePage;
