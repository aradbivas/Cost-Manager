import React  from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {

  return (
    <ul className="nav-links">
        <li>
          <NavLink to="/adduser">Add User</NavLink>
        </li>
        <li>
          <NavLink to="/submit">Add Item</NavLink>
        </li>
        <li>
          <NavLink to="/report">Cost Report</NavLink>
        </li>
    </ul>
  );
};

export default NavLinks;
