import React from 'react';

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  padding: '32px 24px',
  maxWidth: 500,
  margin: '0 auto',
  textAlign: 'center',
};

const AppPage: React.FC = () => {
  return (
    <div style={cardStyle}>
      <h1 style={{ fontSize: 26, margin: '0 0 12px 0', fontWeight: 700 }}>App Dashboard</h1>
      <p style={{ color: '#444', fontSize: 17, marginBottom: 0 }}>
        This is the main application workspace. Future features will appear here.
      </p>
    </div>
  );
};

export default AppPage;
