import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { Link } from 'react-router-dom'


class Login extends Component {
  render() {
    const style = {
      width: 'auto',
      textAlign: 'center'
    }

    return (
      <div>
        <LoginForm />
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