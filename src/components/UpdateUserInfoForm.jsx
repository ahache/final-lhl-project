import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Redirect } from 'react-router-dom'
import $ from 'jquery'
import logo from './static_html/logo-nearhere-bulma-green.png'
import AlertContainer from 'react-alert';

const URL = "http:\//localhost:3001/users";

export class UpdateUserInfoForm extends React.Component {
  constructor(props){
    super(props);
    this.submitChanges = this.submitChanges.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  alertOptions = {
    offset: 50,
    position: 'top right',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }

  // Not sure if a get is nece
  // componentWillMount() {
  //   $.get(URL, {user: sessionStorage.getItem('token')})
  //   .done((data) => {
  //     const userInfo = data[0];
  //     this.props.update(userInfo);
  //   });
  // }

  componentDidMount() {
    $.get(URL, {user: sessionStorage.getItem('token')})
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
      this.msg.error('Passwords do not match');
      $(".input.password").toggleClass("is-danger");
      $(".input.password_confirmation").toggleClass("is-danger");
    } else if (email) {
      if (email.search(/[\w\.]+\@[\w\.]+\.\w+/) < 0) {
        this.msg.error('Must enter valid email');
      } else {
        $.ajax({
          url: URL,
          type: 'PUT',
          data: {user: sessionStorage.getItem('token'), first_name: first_name, last_name: last_name, email: email, password: password}
        }).done((data) => {
          const userInfo = data[0];
          this.clearForm();
          this.props.update(userInfo);
        }).fail((error) => {
          alert(error.responseText);
        });
      }
    } else {
      $.ajax({
        url: URL,
        type: 'PUT',
        data: {user: sessionStorage.getItem('token'), first_name: first_name, last_name: last_name, email: email, password: password}
      }).done((data) => {
        const userInfo = data[0];
        this.clearForm();
        this.props.update(userInfo);
      }).fail((error) => {
        alert(error.responseText);
      });
    }
    e.preventDefault();
  }

  render() {
    const extraDivStyle = {
      padding: '60px 0px',
    };

    if (sessionStorage.getItem('token')) {

      const containerStyle = {
        backgroundColor: "white",
        padding: "20px",
        border: "2px solid",
        borderRadius: "5px",
      };

      const fontStyle = {
        "color": "#00d1b2"
      }

          const bottompadding = {
      paddingBottom: "2.0rem"
    }


      return (

        <section className="hero is-fullheight is-primary is-bold">
          <div className="hero-body">
            <div className="column is-offset-one-quarter is-half is-fluid" style={containerStyle}>
                <div className="has-text-centered" style={bottompadding}>
                <img src={logo} alt="NearHere" width="135" height="98" />
                 </div>

      <form className="updateUser" onSubmit={this.submitChanges}>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="text" ref={(first_name) => this.first_name = first_name} placeholder={this.props.userInfo.first_name}/>
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="text" ref={(last_name) => this.last_name = last_name} placeholder={this.props.userInfo.last_name}/>
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
           <input className="input" type="text" ref={(email) => this.email = email} placeholder={this.props.userInfo.email}/>
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input password" type="password" ref={(password) => this.password = password} placeholder="Password"/>
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input password_confirmation" type="password" ref={(password_confirmation) => this.password_confirmation = password_confirmation} placeholder="Password Confirmation"/>
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>

        <div className="field is-grouped is-grouped-centered">
           <p className="control">
             <button className="submit-button button is-primary" type="submit">Update Profile</button>
            </p>
            <p className="control">
              <button className="button is-primary is-outlined" type="reset">Reset</button>
            </p>
        </div>
        </form>
            </div>
          </div>
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        </section>

      );
    } else {
      <Redirect to="/" />
    }

  }
}

export default UpdateUserInfoForm;