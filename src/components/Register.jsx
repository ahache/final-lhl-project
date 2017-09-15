import React, { Component } from 'react';
import RegisterForm from './RegisterForm.jsx';
import { Link, Redirect } from 'react-router-dom'

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
    this.login = this.login.bind(this);
  }

  login() {
    this.setState({loggedIn: true});
  }

  render() {
    const style = {
      width: 'auto',
      textAlign: 'center'
    }
    if(this.state.loggedIn){
      return(
        <Redirect to="/filters" />
      )
    }
    return (
      <div>
        <RegisterForm login={this.login} />
        <div style={style}>
        <Link to='/login'>Have an account already? Login!</Link>
        </div>
      </div>
    );
  }
}

export default Register;