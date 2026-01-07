import React from 'react';
import { useHealthStatus } from '../lib/api';

const widgetStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 6,
  padding: '8px 16px',
  margin: '16px 0',
  width: 'fit-content',
  fontSize: 15,
};

const HealthWidget: React.FC = () => {
  const { status, loading, error } = useHealthStatus();
  let content;
  if (loading) content = <span>Checking backend health...</span>;
  else if (error) content = <span style={{ color: '#b91c1c' }}>Backend: fail</span>;
  else if (status === 'ok') content = <span style={{ color: '#16a34a' }}>Backend: ok</span>;
  else content = <span style={{ color: '#b91c1c' }}>Backend: fail</span>;
  return <div style={widgetStyle}>{content}</div>;
};

export default HealthWidget;
