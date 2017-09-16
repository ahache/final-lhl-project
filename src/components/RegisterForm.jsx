import React, { Component } from 'react';
import $ from 'jquery';

const URL = "http:\//localhost:3001/register";

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const first = this.first.value;
    const last = this.last.value;
    const email = this.email.value;
    const password = this.password.value;
    if (!first || !last || !email || !password) {
      alert("Please fill out every field");
    } else if (email.search(/[\w\.]+\@[\w\.]+\.\w+/) < 0) {
      alert("Must enter valid email");
    } else {
      if (password !== this.confirmation.value) {
        alert("Passwords must match");
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
            <label className="label is-medium">First Name</label>
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
            <label className="label is-medium">Last Name</label>
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
            <label className="label is-medium">Email</label>
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
            <label className="label is-medium">Password</label>
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
            <label className="label is-medium">Confirm Password</label>
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
      </form>
    );
  }
}
export default RegisterForm;
