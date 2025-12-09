import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || '/'
});

// Optionally, add interceptors for error handling/global auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle global errors
    return Promise.reject(error);
  }
);

export default api;

