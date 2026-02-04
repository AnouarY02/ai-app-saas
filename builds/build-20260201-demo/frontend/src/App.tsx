import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployeesPage from './pages/EmployeesPage';
import ShiftsPage from './pages/ShiftsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/shifts" element={<ShiftsPage />} />
    </Routes>
  );
}

export default App;