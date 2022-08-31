import React, {useContext}  from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = props => {
  return (
      <ul className='nav-links'>
            <li>
            <NavLink to="/login">Login</NavLink>
        </li>
          <li>
          <NavLink to="/signup">Sign Up</NavLink>
          </li>
    </ul>
  );
};

export default NavLinks;
