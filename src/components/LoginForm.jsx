import React, { Component } from 'react';

const URL = "localhost:3001";

class LoginForm extends Component {

  render() {
    return (
      <form className="login-form" action={`${URL}/login`} method="POST">
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Login" />
      </form>
    );
  }
}
export default LoginForm;