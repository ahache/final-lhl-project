import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { Link, Route, Redirect } from 'react-router-dom';
import Filters from './Filters.jsx';


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      // current_user: "none",
      loggedIn: false
    }

    // this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.login = this.login.bind(this);
  }

  // updateCurrentUser(user) {
  //   this.setState({current_user: user});
  // }

  login() {
    this.setState({loggedIn: true});
  }

  render() {
    const style = {
      width: 'auto',
      textAlign: 'center'
    }
    if(this.state.loggedIn){
      return(
        <Redirect to="/filters" />
      )
    }
    return (
      <div>
        <LoginForm login={this.login} />
        <div style={style}>
          <a href='#'>Forgot Password?</a>
          <br/>
          <Link to='/register'>Need an account? Register here</Link>
        </div>
      </div>
    );
  }
}

export default Login;