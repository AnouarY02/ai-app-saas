import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNav from "../components/MainNav";
import { useAuth } from "../hooks/useAuth";

const MainLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  return (
    <div className="main-layout">
      <MainNav />
      <main className="main-content">
        <header className="main-header">
          <div className="user-info">
            {user && <span>Welcome, {user.name}</span>}
          </div>
        </header>
        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;

