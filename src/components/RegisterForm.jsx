import React, { Component } from 'react';
import $ from 'jquery';
import AlertContainer from 'react-alert';

const URL = "http:\//localhost:3001/register";

class RegisterForm extends Component {

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
    const first = this.first.value;
    const last = this.last.value;
    const email = this.email.value;
    const password = this.password.value;
    if (!first || !last || !email || !password) {
      this.msg.error('Please fill out every field');
    } else if (email.search(/[\w\.]+\@[\w\.]+\.\w+/) < 0) {
      this.msg.error('Must enter valid email');
    } else {
      if (password !== this.confirmation.value) {
        this.msg.error('Passwords must match');
      } else {
        $.post(URL, {
          first: first,
          last: last,
          email: email,
          password: password
        })
        .done((data) => {
          localStorage.setItem('token', data);
          this.props.login();
        })
        .fail(() => {
          this.msg.error('Account is already registered', {time: 7000});
        });
      }
    }
    event.preventDefault();
  }

  render() {
    return (
      <form className="register-form" onSubmit={this.handleSubmit}>
        <div className="level-item has-text-centered hero-buttons">
          <div className="field">
            <label className="label is-small">First Name</label>
            <div className="control has-icons-left">
              <input className="input" type="text" required ref={(first) => this.first = first} />
              <span className="icon is-small is-left">
                <i className="fa fa-pencil"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="level-item has-text-centered hero-buttons">
          <div className="field">
            <label className="label is-small">Last Name</label>
            <div className="control has-icons-left">
              <input className="input" type="text" required ref={(last) => this.last = last} />
              <span className="icon is-small is-left">
                <i className="fa fa-pencil"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="level-item has-text-centered hero-buttons">
          <div className="field">
            <label className="label is-small">Email</label>
            <div className="control has-icons-left">
              <input className="input" type="text" required ref={(email) => this.email = email} />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="level-item has-text-centered hero-buttons">
          <div className="field">
            <label className="label is-small">Password</label>
            <div className="control has-icons-left">
              <input className="input" type="password" required ref={(password) => this.password = password} />
              <span className="icon is-small is-left">
                <i className="fa fa-unlock-alt"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="level-item has-text-centered hero-buttons">
          <div className="field">
            <label className="label is-small">Confirm Password</label>
            <div className="control has-icons-left">
              <input className="input" type="password" required ref={(confirmation) => this.confirmation = confirmation}/>
              <span className="icon is-small is-left">
                <i className="fa fa-unlock-alt"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="level-item has-text-centered hero-buttons">
          <div className="field">
            <div className="field-label"></div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input type="submit" value="Register" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />

      </form>
    );
  }
}
export default RegisterForm;
