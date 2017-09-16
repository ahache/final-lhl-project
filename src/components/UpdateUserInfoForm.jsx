import React from 'react'
import ReactDOM from 'react-dom'
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

  render() {
    const extraDivStyle = {
      padding: '50px 0px',
    };

    return (
      <div className="container is-fluid" style={extraDivStyle}>
        <form className="updateUser" onSubmit={this.submitChanges}>
          <div className="field is-grouped">
            <label className="label">First name:</label>
            <div className="control">
              <input className="input" type="text" ref={(first_name) => this.first_name = first_name} placeholder={this.props.userInfo.first_name}/>
            </div>
            <label className="label">Last name:</label>
            <div className="control">
              <input className="input" type="text" ref={(last_name) => this.last_name = last_name} placeholder={this.props.userInfo.last_name}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Email:</label>
            <div className="control has-icons-left">
              <input className="input" type="text" ref={(email) => this.email = email} placeholder={this.props.userInfo.email}/>
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Password:</label>
            <div className="control has-icons-left">
              <input className="input" type="password" ref={(password) => this.password = password} placeholder="Password"/>
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
  }
}

export default UpdateUserInfoForm;
