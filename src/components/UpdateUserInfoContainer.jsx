import React from 'react'
import ReactDOM from 'react-dom'
import UpdateUserInfoForm from './UpdateUserInfoForm.jsx'
import $ from 'jquery'

const URL = "http:\//chrisboshfanclub.herokuapp.com/users";


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
    return (
      <div>
        <UpdateUserInfoForm userInfo={this.state.user_info} update={this.updateUser}/>
      </div>
    );
  }
}

export default UpdateUserInfoContainer;
