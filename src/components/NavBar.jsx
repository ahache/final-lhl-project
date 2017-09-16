import React, { Component } from 'react';
import {Link, Redirect, Router} from 'react-router-dom';
import Logout from './Logout.jsx'
import $ from 'jquery'

class NavBar extends Component {
  constructor(props){
    super(props)
    this.transitionToUser = this.transitionToUser.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.transitionToMap = this.transitionToMap.bind(this);
  }

  transitionToUser() {
    var transitionTo = Router.transitionTo;
    transitionTo('/user' );
  }

  transitionToMap() {
    var transitionTo = Router.transitionTo;
    transitionTo('/user' );
  }

  dropDown(e) {
    $(".navbar-item.has-dropdown").toggleClass('is-active');
  }

  render() {
    if (localStorage.getItem('token')) {
      return (
        <nav className="navbar is-light" role="navigation" aria-label="dropdown navigation">
          <div className="navbar-item has-dropdown">
            <a className="navbar-link" onClick={this.dropDown}>
              Menu
            </a>

            <div className="navbar-dropdown">
              <div className="navbar-item">
                <Link to={`/map`} >Map</Link>
              </div>
              <hr class="navbar-divider" />

              <div className="navbar-item">
                <Link to={`/filters`} >Filters</Link>
              </div>
              <hr class="navbar-divider" />

              <div className="navbar-item">
                <Link to={`/user`} >Update Profile</Link>
              </div>
              <hr class="navbar-divider" />
              <Logout />
            </div>
          </div>
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
