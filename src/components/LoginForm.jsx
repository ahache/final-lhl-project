import React, { Component } from 'react';
import $ from 'jquery';

const URL = "http:\//localhost:3001/login";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const email = this.email.value;
    const password = this.password.value;
    if (!email || !password) {
      alert("Fields must not be empty");
    } else {
      $.post(URL, {email: email, password: password})
        .done((data) => {
          console.log(data);
          this.props.current_user(data[0].email);
          this.props.login();
        });
    }
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