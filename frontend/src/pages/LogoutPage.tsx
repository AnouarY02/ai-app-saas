import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutRequest } from '../utils/apiClient';
import { useAppDispatch } from '../redux/hooks';
import { clearAuth } from '../redux/authSlice';

const LogoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const doLogout = async () => {
      try {
        await logoutRequest();
      } catch {}
      dispatch(clearAuth());
      navigate('/login', { replace: true });
    };
    doLogout();
  }, [dispatch, navigate]);
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="text-lg">Logging out...</span>
    </div>
  );
};
export default LogoutPage;
