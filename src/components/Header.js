import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Punk Beers</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink to="/login" activeClassName="is-active" exact={true}>Login</NavLink>
    <NavLink to="/signup" activeClassName="is-active">SignUp</NavLink>
    <NavLink to="/favorite" activeClassName="is-active">Favortite</NavLink>
  </header>
);

export default Header;
