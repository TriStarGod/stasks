// @flow

import $ from 'jquery';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { APP_NAME } from '../config';
import { HOME, HELLO, HELLO_ASYNC, NOT_FOUND } from '../route';

const handleNavLinkClick = () => {
  $('body').scrollTop(0);
  $('.js-navbar-collapse').collapse('hide');
};

const Nav = () =>
  <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <button className="navbar-toggler navbar-toggler-right" type="button" role="button" data-toggle="collapse" data-target=".js-navbar-collapse">
      <span className="navbar-toggler-icon" />
    </button>
    <Link to={HOME} className="navbar-brand">{APP_NAME}</Link>
    <div className="js-navbar-collapse collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        {[
          { route: HOME, label: 'Home' },
          { route: HELLO, label: 'Say Hello' },
          { route: HELLO_ASYNC, label: 'Say Hello Asynchronously' },
          { route: NOT_FOUND, label: '404 Demo' },
        ].map(link => (
          <li className="nav-item" key={link.route}>
            <NavLink to={link.route} className="nav-link" activeStyle={{ color: 'white' }} exact onClick={handleNavLinkClick}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  </nav>;

export default Nav;
