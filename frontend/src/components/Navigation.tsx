import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import "./Navigation.css";

const navMenu = [
  { label: "Dashboard", path: "/dashboard", icon: "🏠" },
  { label: "Profile", path: "/profile", icon: "👤" },
  { label: "Settings", path: "/settings", icon: "⚙️" }
];

const Navigation: React.FC = () => {
  const { user } = useAuth();
  return (
    <nav className="nav">
      <div className="nav-header">AI App</div>
      <ul className="nav-list">
        {navMenu.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {user && (
        <div className="nav-footer">
          <NavLink to="/logout" className="nav-link">
            <span className="nav-icon">🚪</span> Logout
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
