import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LogoutPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout().finally(() => {
      navigate('/login', { replace: true });
    });
    // eslint-disable-next-line
  }, []);

  return <div style={{ textAlign: 'center', marginTop: 48 }}>Logging out...</div>;
};

export default LogoutPage;
