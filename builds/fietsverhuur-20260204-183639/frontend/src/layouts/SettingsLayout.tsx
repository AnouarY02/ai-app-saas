import React from 'react';
import { Outlet } from 'react-router-dom';

export const SettingsLayout = () => (
  <div className="settings-layout">
    <nav>
      <a href="/settings/profile">Profile</a>
      <a href="/settings/account">Account</a>
    </nav>
    <Outlet />
  </div>
);