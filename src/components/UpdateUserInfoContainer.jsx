import React from 'react'
import ReactDOM from 'react-dom'
import UpdateUserInfoForm from './UpdateUserInfoForm.jsx'
import $ from 'jquery'

const URL = "http:\//localhost:3001/users";


export class UpdateUserInfoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_info: {}
    }
    this.submitChanges = this.submitChanges.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  submitChanges(e) {
    $.ajax({
      url: URL,
      type: 'PUT',
      data: {user: localStorage.getItem('token'), user_info: this.state.user_info},
    }).done((data) => {
      const userInfo = data;
      this.setState({user_info: userInfo});
    }).fail((error) => {
      alert(error.responseText);
    });
    e.preventDefault();
  }

  updateUser(user) {
    this.setState({user_info: user});
  }

  render() {
    return (
      <div>
        <UpdateUserInfoForm onSubmit={this.submitChanges} userInfo={this.state.user_info} update={this.updateUser}/>
      </div>
    );
  }
}

export default UpdateUserInfoContainer;
