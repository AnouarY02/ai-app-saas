import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About AI App</h1>
      <p className="mb-2 text-gray-700">AI App is a modern SaaS platform designed to help you leverage the power of artificial intelligence for productivity and insight. Built with a focus on usability, security, and extensibility, our platform is your gateway to the future of work.</p>
      <ul className="list-disc list-inside text-gray-700 mt-4">
        <li>Secure authentication and user management</li>
        <li>Modern, responsive UI with React and TailwindCSS</li>
        <li>Extensible for future AI-powered features</li>
      </ul>
    </div>
  );
};

export default AboutPage;
