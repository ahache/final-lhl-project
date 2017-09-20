import React, { Component } from 'react';
import {NavLink, Link, Redirect, Router} from 'react-router-dom';
import Logout from './Logout.jsx';
import $ from 'jquery';
import logo from './static_html/logo-nearhere-bulma-green-compass.png';

class NavBar extends Component {
  constructor(props){
    super(props)
  }

  toggle() {
    $('.navbar-menu').toggleClass('is-active');
  }

  render() {

    const style = {
      backgroundColor: '#f5f5f5'
    }

    if (localStorage.getItem('token')) {
      return (
        <nav className='navbar' style={style} role='navigation' aria-label='main navigation'>

          <div className="navbar-brand">
            <a className="navbar-item">
              <img src={logo}  height="30" width="30" />
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
                <Link to="/filters" onClick={this.toggle}>Filters</Link>
              </div>

              <div className="navbar-item">
                <Link to="/map" onClick={this.toggle}>Map</Link>
              </div>

              <div className="navbar-item">
                <Link to="/favorites" onClick={this.toggle}>Favorites</Link>
              </div>

              <div className="navbar-item">
                <Link to="/user" onClick={this.toggle}>Update Profile</Link>
              </div>

            </div>

            <div className="navbar-end">
              <div className="navbar-item">
              <a className="button is-focused">
                <Logout />
              </a>
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
