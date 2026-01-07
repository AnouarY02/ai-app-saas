import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './routes/HomePage';
import HelloWorldPage from './routes/HelloWorldPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hello" element={<HelloWorldPage />} />
      </Route>
    </Routes>
  );
};

export default App;
