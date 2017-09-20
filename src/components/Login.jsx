import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { Link, Route, Redirect } from 'react-router-dom';
import Filters from './Filters.jsx';
import Footer from './Footer.jsx';
import logo from './static_html/logo-nearhere-bulma-green.png'


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      // current_user: "none",
      loggedIn: false
    }

    // this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.login = this.login.bind(this);
  }

  // updateCurrentUser(user) {
  //   this.setState({current_user: user});
  // }

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
                   <LoginForm login={this.login} />
              <div className="tile is-info">
                <div className="container">
                  <div className="content has-text-centered" style={padding}>
                      <Link to='/register' style={fontStyle}>
                        <a className="button is-primary is-outlined">
                          Need an account? Register here
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

export default Login;
