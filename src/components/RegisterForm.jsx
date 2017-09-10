import React, { Component } from 'react';

const URL = "localhost:3001";

class RegisterForm extends Component {
  render() {
    return (
      <form className="register-form" action="localhost:3001/register" method="POST">
        <label>
          First name:
          <input type="text" name="first" />
        </label>
        <label>
          Last name:
          <input type="text" name="last" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <label>
          Confirmation:
          <input type="password" name="confirmation" />
        </label>
        <input type="submit" value="Register" />
      </form>
    );
  }
}
export default RegisterForm;