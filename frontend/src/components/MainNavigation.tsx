import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from './icons/HomeIcon';


const MainNavigation: React.FC = () => {
  return (
    <nav className="">
      <NavLink
        to="/"
        className={({ isActive }) =>
          ""
        }
        end
      >
        <HomeIcon className="" /> Home
      </NavLink>
    </nav>
  );
};

export default MainNavigation;
