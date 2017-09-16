import React, { Component } from 'react';
import {Link, Redirect } from 'react-router-dom';
import Logout from './Logout.jsx'

class NavBar extends Component {
  render() {
    if (localStorage.getItem('token')) {
      return (
        <nav>
        🏠
        <Logout />
        <Link to='/user'>Update Profile</Link>
        </nav>
      );
    } else {
      return (
        <nav>
        🏠
        </nav>
      );
    }

  }
}

export default NavBar;
