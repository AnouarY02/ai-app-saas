import React from "react";
import { useAuth } from "../state/AuthContext";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name || user?.email}!</p>
      <p>This is your central hub for AI App SaaS features.</p>
    </div>
  );
};

export default DashboardPage;
