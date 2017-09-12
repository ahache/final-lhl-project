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
          });
      }
    }
    event.preventDefault();
  }    

  render() {
    return (
      <form className="register-form" onSubmit={this.handleSubmit}>
        <label>
          First name:
          <input type="text" ref={(first) => this.first = first} />
        </label>
        <label>
          Last name:
          <input type="text" ref={(last) => this.last = last} />
        </label>
        <label>
          Email:
          <input type="text" ref={(email) => this.email = email} />
        </label>
        <label>
          Password:
          <input type="password" ref={(password) => this.password = password} />
        </label>
        <label>
          Confirmation:
          <input type="password" ref={(confirmation) => this.confirmation = confirmation} />
        </label>
        <input type="submit" value="Register" />
      </form>
    );
  }
}
export default RegisterForm;