import React from 'react';
import { Link } from 'react-router-dom';
import {useAuthContext} from "../hooks/useAuthContext";
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNavigation.css';
import LoggedNavLinks from "./LoggedNavLinks";
const MainNavigation = props => {
  const {user} = useAuthContext();

  return (
    <React.Fragment>

      <MainHeader>
        <h1 className="main-navigation__title">
          <Link to="/">Cost Manager</Link>
        </h1>
        <nav className="main-navigation__header-nav">
        {!user && (
          <NavLinks/>)}
          {user && (
              <LoggedNavLinks/>)}
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
