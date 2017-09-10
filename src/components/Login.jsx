import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { Link } from 'react-router-dom'


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: "none"
    }

    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  updateCurrentUser(user) {
    console.log(user);
    this.setState({current_user: user});
  }

  render() {
    const style = {
      width: 'auto',
      textAlign: 'center'
    }
    return (
      <div>
        <LoginForm current_user={this.updateCurrentUser} />
        <div style={style}>
          <a href='#'>Forgot Password?</a>
          <br/>
          <Link to='/register'>Need an account? Register here</Link>
        </div>
        <p>current user: {this.state.current_user}</p>
      </div>
    );
  }
}

export default Login;