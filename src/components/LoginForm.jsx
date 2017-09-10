import React, { Component } from 'react';
import $ from 'jquery';

// const URL = "localhost:3001";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    $.post('http:\//localhost:3001/login', {email: this.email.value})
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