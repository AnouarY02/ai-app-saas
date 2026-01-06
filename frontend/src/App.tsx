import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import BlankLayout from './layouts/BlankLayout';
import HomePage from './routes/HomePage';
import HelloPage from './routes/HelloPage';
import NotFoundPage from './routes/NotFoundPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hello" element={<HelloPage />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;