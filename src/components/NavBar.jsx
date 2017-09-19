import React, { Component } from 'react';
import {NavLink, Link, Redirect, Router} from 'react-router-dom';
import Logout from './Logout.jsx';
import $ from 'jquery';
import logo from './static_html/explore-tool.png';

class NavBar extends Component {
  constructor(props){
    super(props)
  }

  toggle() {
    $('.navbar-menu').toggleClass('is-active');
  }

  render() {

    const style = {
      backgroundColor: 'rgb(230, 255, 242)'
    }

    if (localStorage.getItem('token')) {
      return (
        <nav className='navbar' style={style} role='navigation' aria-label='main navigation'>

          <div className="navbar-brand">
            <a className="navbar-item">
              <img src={logo}  height="10" width="30" />
            </a>
            <button className="button navbar-burger" onClick={this.toggle}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div className="navbar-menu">

            <div className="navbar-start">

              <div className="navbar-item">
                <Link to="/filters">Filters</Link>
              </div>

              <div className="navbar-item">
                <Link to="/map">Map</Link>
              </div>

              <div className="navbar-item">
                <Link to="/favorites">Favorites</Link>
              </div>

              <div className="navbar-item">
                <Link to="/user">Update Profile</Link>
              </div>

            </div>

            <div className="navbar-end">
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
