import React, { Component } from 'react';
import $ from 'jquery';

const URL = "http:\//localhost:3001/login";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    $.post(URL, {email: this.email.value, password: this.password.value})
      .done((data) => {
        console.log(data);
      });
    event.preventDefault();
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" ref={(email) => this.email = email} />
        </label>
        <label>
          Password:
          <input type="password" ref={(password) => this.password = password} />
        </label>
        <input type="submit" value="Login" />
      </form>
    );
  }
}
export default LoginForm;