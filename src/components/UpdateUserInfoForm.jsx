import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'


const URL = "http:\//localhost:3001/users";

export class UpdateUserInfoForm extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    $.get(URL, {user: localStorage.getItem('token')})
    .done((data) => {
      const userInfo = data[0];
      this.props.update(userInfo);
      this.setState({user_info: userInfo});
    });
  }

  componentDidMount() {
    $.get(URL, {user: localStorage.getItem('token')})
    .done((data) => {
      const userInfo = data[0];
      this.props.update(userInfo);
      this.setState({user_info: userInfo});
    });
  }

  render() {
    return (
      <div className="container is-fluid">
        <form className="updateUser" onSubmit={this.props.submitChanges}>
          <div className="field is-grouped">
            <label className="label">First name:</label>
            <div className="control">
              <input className="input" type="text" placeholder={this.props.userInfo.first_name}/>
            </div>
            <label className="label">Last name:</label>
            <div className="control">
              <input className="input" type="text" placeholder={this.props.userInfo.last_name}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Email:</label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder={this.props.userInfo.email}/>
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Password:</label>
            <div className="control has-icons-left">
              <input className="input" type="password" placeholder="Password"/>
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </div>
          </div>
          <div class="field is-grouped">
            <p class="control">
              <button className="button is-primary" type="submit">Update Profile</button>
            </p>
            <p class="control">
              <button className="button" type="reset">Reset</button>
            </p>
          </div>
        </form>
      </div>
    );
  }

}

export default UpdateUserInfoForm;
