import React, { Component } from 'react';
import RegisterForm from './RegisterForm.jsx';
import { Link } from 'react-router-dom'

class Register extends Component {
  render() {
    const style = {
      width: 'auto',
      textAlign: 'center'
    }

    return (
      <div>
        <RegisterForm />
        <div style={style}>
        <Link to='/login'>Have an account already? Login!</Link>
        </div>
      </div>
    );
  }
}

export default Register;