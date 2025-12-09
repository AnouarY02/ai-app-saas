import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogoutPage: React.FC = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="logout-page centered">
      <h2>Signing out...</h2>
    </div>
  );
};

export default LogoutPage;

