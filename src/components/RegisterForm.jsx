import React, { Component } from 'react';
import $ from 'jquery';
import AlertContainer from 'react-alert';

const URL = location.origin+"/register";

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

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className='input' type="text" placeholder="First Name" ref={(first) => this.first = first}/>
            <span className="icon is-small is-left">
              <i className="fa fa-pencil"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className='input' type="text" placeholder="Last Name" ref={(last) => this.last = last} />
            <span className="icon is-small is-left">
              <i className="fa fa-pencil"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className='input' type="text" placeholder="Email" ref={(email) => this.email = email} />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className='input' type="password" placeholder="Password" ref={(password) => this.password = password} />
            <span className="icon is-small is-left">
              <i className="fa fa-unlock-alt"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className='input' type="password" placeholder="Confirm Password" ref={(confirmation) => this.confirmation = confirmation} />
            <span className="icon is-small is-left">
              <i className="fa fa-unlock-alt"></i>
            </span>
          </p>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <p className="control">
            <input className="button is-primary" type="submit" value="Register" />
          </p>
        </div>

        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />

      </form>
    );
  }
}
export default RegisterForm;
