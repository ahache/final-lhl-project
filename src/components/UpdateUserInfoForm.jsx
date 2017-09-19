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
  // componentWillMount() {
  //   $.get(URL, {user: localStorage.getItem('token')})
  //   .done((data) => {
  //     const userInfo = data[0];
  //     this.props.update(userInfo);
  //   });
  // }

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

      const containerStyle = {
        backgroundColor: "white",
        padding: "20px",
        border: "2px solid",
        borderRadius: "5px",
      };

      const fontStyle = {
        "color": "#00d1b2"
      }

      return (

        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="column is-offset-one-quarter is-half is-fluid" style={containerStyle}>


              <h2 className="subtitle is-8 has-text-centered" style={fontStyle}>
                Update your account information
              </h2>

              <form className="updateUser" onSubmit={this.submitChanges}>

                <div className="level-item has-text-centered hero-buttons">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input className="input is-small" type="text" ref={(first_name) => this.first_name = first_name} placeholder={this.props.userInfo.first_name}/>
                        <span className="icon is-small is-left">
                          <i className="fa fa-user"></i>
                        </span>
                    </div>
                  </div>
                </div>

                <div className="level-item has-text-centered hero-buttons">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input className="input is-small" type="text" ref={(last_name) => this.last_name = last_name} placeholder={this.props.userInfo.last_name}/>
                        <span className="icon is-small is-left">
                          <i className="fa fa-user"></i>
                        </span>
                    </div>
                  </div>
                </div>

                <div className="level-item has-text-centered hero-buttons">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input className="input is-small" type="text" ref={(email) => this.email = email} placeholder={this.props.userInfo.email}/>
                      <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="level-item has-text-centered hero-buttons">

                  <div className="field">
                    <div className="control has-icons-left">
                      <input className="input is-small password" type="password" ref={(password) => this.password = password} placeholder="Password"/>
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="level-item has-text-centered hero-buttons">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input className="input is-small password_confirmation" type="password" ref={(password_confirmation) => this.password_confirmation = password_confirmation} placeholder="Password Confirmation"/>
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="field is-grouped is-grouped-centered" style={{paddingTop: "20px"}}>
                  <p className="control">
                    <button className="submit-button button is-primary" type="submit">Update Profile</button>
                  </p>
                  <p className="control">
                    <button className="button" type="reset">Reset</button>
                  </p>
                </div>
              </form>

            </div>
          </div>
        </section>
      );
    } else {
      <Redirect to="/login" />
    }

  }
}

export default UpdateUserInfoForm;
