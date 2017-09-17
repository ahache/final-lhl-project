import React, { Component } from 'react';
import RegisterForm from './RegisterForm.jsx';
import { Link, Redirect } from 'react-router-dom'
import logo from './static_html/LOGO_CONCEPT.png'
import video from './static_html/hero-video-2.mp4'

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
      <div className="columns is-mobile is-centered">
        <div className="column is-third is-narrow">
          <section className="hero is-fullheight video">
            <div className="hero-video">
              <video id="bgvid" playsInline autoPlay muted loop>
                <source src={video} type="video/mp4" />
              </video>
            </div>
            <div className="hero-body">
              <div className="container is-fluid box">
                <div className="level-item has-text-centered">
                  <img src={logo} alt="PioneerPal" height="40" width="229" />
                </div>
                <RegisterForm login={this.login} />
                <div className="level-item has-text-centered hero-buttons">
                  <Link to='/login'>Have an account already? Login!</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Register;
