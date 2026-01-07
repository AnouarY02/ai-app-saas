import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HealthWidget from './components/HealthWidget';
import HomePage from './pages/HomePage';
import AppPage from './pages/AppPage';

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: '#f7f8fa',
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '32px 16px',
};

const App: React.FC = () => {
  return (
    <div style={layoutStyle}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: '100%', maxWidth: 900 }}>
          <HealthWidget />
          <main style={mainStyle}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/app" element={<AppPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
