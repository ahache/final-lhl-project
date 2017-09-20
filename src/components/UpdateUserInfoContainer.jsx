import React from 'react'
import ReactDOM from 'react-dom'
import UpdateUserInfoForm from './UpdateUserInfoForm.jsx'
import $ from 'jquery'
import { Link, Redirect } from 'react-router-dom'

const URL = "http:\//localhost:3001/users";


export class UpdateUserInfoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_info: {}
    }
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(user) {
    this.setState({user_info: user});
  }

  render() {

    if (!localStorage.getItem('token')) {
      return(
        <Redirect to="/" />
      )
    }
    return (
      <div>
        <UpdateUserInfoForm userInfo={this.state.user_info} update={this.updateUser}/>
      </div>
    );
  }
}

export default UpdateUserInfoContainer;
