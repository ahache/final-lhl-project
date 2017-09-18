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
      <div>
        <div className="columns is-mobile is-large is-centered">
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
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <strong>Chris Bosh Fan Club</strong> by <a href="https://github.com/ahache">Alex H</a>, <a href="https://github.com/hounslow">Matt H</a>,  <a href="https://github.com/jonosue">Jonathan S</a>, and <a href="https://github.com/MattWillcox">Matt W</a>. The website content
                  is not licensed...yet.
                </p>
                <p>
                  <a className="icon" href="https://github.com/hounslow/final-lhl-project">
                    <i className="fa fa-github"></i>
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      );
    }
  }

  export default Register;
