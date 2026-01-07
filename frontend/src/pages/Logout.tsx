import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from 'shared/src/utils/apiClient';
import { useAuth } from '../state/AuthContext';

const Logout: React.FC = () => {
  const { clearAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.post('/api/auth/logout').finally(() => {
      clearAuth();
      navigate('/login', { replace: true });
    });
    // eslint-disable-next-line
  }, []);

  return <div className="logout-page">Logging out...</div>;
};

export default Logout;
