import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    return (
      <form className="login-form">
        <label>
          Email:
          <input type="text" name="Email" />
        </label>
        <label>
          Password:
          <input type="password" name="Password" />
        </label>
        <input type="submit" value="Login" />
      </form>
    );
  }
}
export default LoginForm;