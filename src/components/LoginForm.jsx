import React, { Component } from 'react';
import $ from 'jquery';
import jwt from 'jsonwebtoken';
import AlertContainer from 'react-alert';

const URL = "https:\//nearhere-lhl.herokuapp.com/login";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  alertOptions = {
    offset: 50,
    position: 'top right',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }

  handleSubmit(event) {
    const email = this.email.value;
    const password = this.password.value;
    if (!email || !password) {
      this.msg.error('Please fill out both fields');
    } else {
      $.post(URL, {email: email, password: password})
      .done((data) => {
        sessionStorage.setItem('token', data);
        this.props.login();
      })
      .fail(() => {
        this.msg.error('Please check your credentials');
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

        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />

      </form>
    );
  }
}
export default LoginForm;
