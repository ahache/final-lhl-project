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
                Create an account
              </h2>
              <RegisterForm login={this.login} />
              <div className="tile is-info">
                <div className="container">
                  <div className="content has-text-centered" style={padding}>
                    <Link to='/login' style={fontStyle}>Have an account already? Login!</Link>
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


      // <div>
      //   <div className="columns is-mobile is-large is-centered">
      //     <div className="column is-third is-narrow">
      //       <section className="hero is-fullheight video">
      //         <div className="hero-body">
      //           <div className="container is-fluid box">
      //             <RegisterForm login={this.login} />
      //             <div className="level-item has-text-centered hero-buttons">
      //               <Link to='/login'>Have an account already? Login!</Link>
      //             </div>
      //           </div>
      //         </div>
      //       </section>
      //     </div>
      //   </div>
      // </div>