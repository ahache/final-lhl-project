import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Redirect } from 'react-router-dom'
import $ from 'jquery'


const URL = "http:\//localhost:3001/users";

export class UpdateUserInfoForm extends React.Component {
  constructor(props){
    super(props);
    this.submitChanges = this.submitChanges.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  // Not sure if a get is nece
  componentWillMount() {
    $.get(URL, {user: localStorage.getItem('token')})
    .done((data) => {
      const userInfo = data[0];
      this.props.update(userInfo);
    });
  }

  componentDidMount() {
    $.get(URL, {user: localStorage.getItem('token')})
    .done((data) => {
      const userInfo = data[0];
      this.props.update(userInfo);
    });
  }

  clearForm() {
    $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
  }

  submitChanges(e) {
    const first_name = this.first_name.value;
    const last_name = this.last_name.value;
    const email = this.email.value;
    const password = this.password.value;
    const password_confirmation = this.password_confirmation.value;

    if (password !== password_confirmation) {
      alert("Passwords don't match!");
      $(".input.password").toggleClass("is-danger");
      $(".input.password_confirmation").toggleClass("is-danger");
      e.preventDefault();
    } else {
      $.ajax({
        url: URL,
        type: 'PUT',
        data: {user: localStorage.getItem('token'), first_name: first_name, last_name: last_name, email: email, password: password}
      }).done((data) => {
        const userInfo = data[0];
        this.clearForm();
        this.props.update(userInfo);
      }).fail((error) => {
        alert(error.responseText);
      });
      e.preventDefault();
    }
  }

  render() {
    const extraDivStyle = {
      padding: '60px 0px',
    };

    if (localStorage.getItem('token')) {
      return (
        <div className="container is-fluid" style={extraDivStyle}>
          <form className="updateUser" onSubmit={this.submitChanges}>
            <div className="field is-grouped">
              <label className="label is-small">First name:</label>
              <div className="control">
                <input className="input" type="text" ref={(first_name) => this.first_name = first_name} placeholder={this.props.userInfo.first_name}/>
              </div>
              <label className="label is-small">Last name:</label>
              <div className="control">
                <input className="input" type="text" ref={(last_name) => this.last_name = last_name} placeholder={this.props.userInfo.last_name}/>
              </div>
            </div>

            <div className="field">
              <label className="label is-small">Email:</label>
              <div className="control has-icons-left">
                <input className="input" type="text" ref={(email) => this.email = email} placeholder={this.props.userInfo.email}/>
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label is-small">Password:</label>
              <div className="control has-icons-left">
                <input className="input password" type="password" ref={(password) => this.password = password} placeholder="Password"/>
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label is-small">Password Confirmation:</label>
              <div className="control has-icons-left">
                <input className="input password_confirmation" type="password" ref={(password_confirmation) => this.password_confirmation = password_confirmation} placeholder="Password"/>
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <button className="submit-button button is-primary" type="submit">Update Profile</button>
              </p>
              <p className="control">
                <button className="button" type="reset">Reset</button>
              </p>
            </div>
          </form>
        </div>
      );
    } else {
      <Redirect to="/login" />
    }

  }
}

export default UpdateUserInfoForm;
