import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: true
    }
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    this.setState({loggedIn: false});
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <a onClick={this.logoutUser}>Logout</a>
    );
  }
}

export default Logout;
