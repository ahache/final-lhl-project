import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { Link, Route, Redirect } from 'react-router-dom';
import Filters from './Filters.jsx';
import Footer from './Footer.jsx';


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

    if(this.state.loggedIn){
      return(
        <Redirect to="/filters" />
      )
    }

    return (
      <div>
        <section className="hero is-fullheight is-primary is-bold">
          <div className="hero-body">
            <div className="column is-offset-one-quarter is-half is-fluid" style={containerStyle}>
              <h2 className="subtitle is-4 has-text-centered" style={fontStyle}>
                Login to your account
              </h2>
              <LoginForm login={this.login} />
              <div className="tile is-info">
                <div className="container">
                  <div className="content has-text-centered" style={padding}>
                      <Link to='/register' style={fontStyle}>Need an account? Register here</Link>
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
