import React from "react";
import { NavLink } from "react-router-dom";
import { mainMenu } from "../navigation";

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <span role="img" aria-label="dashboard">📊</span>,
  user: <span role="img" aria-label="user">👤</span>,
  settings: <span role="img" aria-label="settings">⚙️</span>,
};

const MainNav: React.FC = () => {
  return (
    <nav className="main-nav">
      <ul>
        {mainMenu.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              end={item.path === "/"}
            >
              <span className="nav-icon">{iconMap[item.iconHint] || null}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li className="nav-secondary">
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;

