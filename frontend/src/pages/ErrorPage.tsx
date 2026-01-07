import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const location = useLocation();
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Oops! Something went wrong.</h2>
      <p>
        Sorry, we couldn't process your request.
        <br />
        <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Path: {location.pathname}</span>
      </p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default ErrorPage;
