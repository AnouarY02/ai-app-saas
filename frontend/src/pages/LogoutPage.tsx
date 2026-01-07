import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

const LogoutPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout().finally(() => {
      navigate("/login", { replace: true });
    });
  }, [logout, navigate]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
