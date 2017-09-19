import React, { Component } from 'react';
import {Link, Redirect, Router} from 'react-router-dom';
import Logout from './Logout.jsx'
import $ from 'jquery'
import logo from './static_html/explore-tool.png'

class NavBar extends Component {
  constructor(props){
    super(props)
  }

  render() {
    if (localStorage.getItem('token')) {
      return (
        <nav className="navbar" role="navigation" aria-label="dropdown navigation">

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <img src={logo}  height="10" width="30" />
               Menu
            </a>

            <div className="navbar-dropdown">
              <div className="navbar-item">
                <Link to={`/map`} >Map</Link>
              </div>

              <div className="navbar-item">
                <Link to={`/filters`} >Filters</Link>
              </div>

              <div className="navbar-item">
                <Link to={`/favorites`} >Favorites</Link>
              </div>

              <div className="navbar-item">
                <Link to={`/user`} >Update Profile</Link>
              </div>

              <div className="navbar-item">
              <Logout />
              </div>
            </div>
          </div>
        </nav>
      );
    } else {
      return null;
    }
  }
}

export default NavBar;