import React, { Component } from 'react';
import $ from 'jquery';

const URL = "http:\//localhost:3001/register";

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // Check if password and confirmation match on the client end
    const password = this.password.value;
    if (password !== this.confirmation.value) {
      alert("Passwords must match");
      return;
    }
    $.post(URL, {
      first: this.first.value,
      last: this.last.value,
      email: this.email.value, 
      password: password
    })
      .done((data) => {
        console.log(data);
      });
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