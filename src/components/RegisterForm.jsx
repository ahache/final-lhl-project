import React, { Component } from 'react';

class RegisterForm extends Component {
  render() {
    return (
      <form className="login-form">
        <label>
          First name:
          <input type="text" name="First_name" />
        </label>
        <label>
          Last name:
          <input type="text" name="Last_name" />
        </label>
        <label>
          Email:
          <input type="text" name="Email" />
        </label>
        <label>
          Password:
          <input type="password" name="Password" />
        </label>
        <label>
          Confirmation:
          <input type="password" name="Confirmation" />
        </label>
        <input type="submit" value="Register" />
      </form>
    );
  }
}
export default RegisterForm;