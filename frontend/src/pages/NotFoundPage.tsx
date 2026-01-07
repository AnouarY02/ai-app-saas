import React from 'react';
import { Link } from 'react-router-dom';


const NotFoundPage: React.FC = () => (
  <div className="">
    <h2 className="">404 - Page Not Found</h2>
    <p className="">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="">
      Go to Home
    </Link>
  </div>
);

export default NotFoundPage;
