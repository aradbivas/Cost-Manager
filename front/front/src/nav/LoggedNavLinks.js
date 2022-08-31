import React, {useContext}  from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import {useLogout} from "../hooks/useLogout";


const NavLinks = props => {
    const {logout} = useLogout();

    const handleClick = () => {
        logout();
    }
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to="/submit">Add Item</NavLink>
            </li>
            <li>
                <NavLink to="/report">Cost Report</NavLink>
            </li>
            <li>
                <button className='nav-button' onClick={handleClick}>Log out</button>
            </li>

        </ul>
    );
};

export default NavLinks;
