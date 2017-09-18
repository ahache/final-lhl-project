import React, { Component } from 'react';
import $ from 'jquery';
import jwt from 'jsonwebtoken';

const URL = "http:\//localhost:3001/login";

class LoginForm extends Component {
  constructor(props) {
    super(props);
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
        localStorage.setItem('token', data);
        // this.props.current_user(email);
        this.props.login();
      });
    }
    event.preventDefault();
  }

  render() {

    return (
      <form className="login-form" onSubmit={this.handleSubmit}>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className='input' type="text" ref={(email) => this.email = email} placeholder="Email Address"/>
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className='input' type="password" ref={(password) => this.password = password} placeholder="Password" />
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>

          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <input className="button is-primary" type="submit" value="Login" />
            </p>
          </div>

      </form>
    );
  }
}
export default LoginForm;
