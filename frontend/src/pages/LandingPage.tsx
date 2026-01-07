import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Welcome to AI App SaaS</h1>
      <p>Your platform for AI-powered productivity.</p>
      {user ? (
        <Link to="/dashboard">Go to Dashboard</Link>
      ) : (
        <>
          <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default LandingPage;
