import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/authContext';

const LogoutPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/', { replace: true });
    // eslint-disable-next-line
  }, []);

  return <div>Logging out...</div>;
};

export default LogoutPage;
