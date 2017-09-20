import React, { Component } from 'react';
import RegisterForm from './RegisterForm.jsx';
import { Link, Redirect } from 'react-router-dom';
import logo from './static_html/logo-nearhere-bulma-green.png'

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
    const containerStyle = {
      backgroundColor: "white",
      padding: "20px",
      border: "0px solid",
      borderRadius: "5px",
    };

    const fontStyle = {
      "color": "#00d1b2"
    }

    const padding = {
      paddingTop: "10px"
    }

    const style = {
      width: 'auto',
      textAlign: 'center'
    }

    const bottompadding = {
      paddingBottom: "2.0rem"
    }

    if((this.state.loggedIn) || (localStorage.getItem('token'))){
      return(
        <Redirect to="/filters" />
      )
    }

    return (
      <div>
        <section className="hero is-fullheight is-primary is-bold">
          <div className="hero-body">
            <div className="column is-offset-one-quarter is-half is-fluid" style={containerStyle}>
                <div className="has-text-centered" style={bottompadding}>
                <img src={logo} alt="NearHere" width="135" height="98" />
                 </div>
                   <RegisterForm login={this.login} />
              <div className="tile is-info">
                <div className="container">
                  <div className="content has-text-centered" style={padding}>
                    <Link to='/login' style={fontStyle}>
                      <a className="button is-primary is-outlined">
                        Have an account already? Login!
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;