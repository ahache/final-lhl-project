import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import logo from './static_html/logo-nearhere-bulma-green.png'
import video from './static_html/hero-video-2.mp4'
import Filters from './Filters.jsx'

class Index extends Component {

  render() {
    const style = {
      backgroundColor: "#f5f5f5",
      paddingTop: '0',
      paddingBottom: '0',
      paddingRight: '0',
      paddingLeft: '0'
    }
    const top = {
      paddingTop: '0',
      paddingBottom: '0',
      paddingRight: '0',
      paddingLeft: '0'
    }
    // const videoStyle = {
    //   paddingTop: '0',
    //   paddingBottom: '0',
    //   height: '100%',
    //   width: '177.77777778vh',
    //   minWidth: '100%',
    //   minHeight: '56.25vw',
    // }

    if (localStorage.getItem('token')) {
      return (
        <Redirect to="/filters" />
      )
    }
    return (
      <div style={style}>
        <section style={top} className="hero is-mobile is-fullheight">
          <div style={top} className="hero-body">
            <div style={top}>
              <video style={top} className="hero-video" id="bgvid" playsInline autoPlay muted loop>
                <source src={video} type="video/mp4" />
              </video>
            </div>
            <div className="container has-text-centered">
              <img src={logo} alt="NearHere" width="285" height="207" />
              <div className="hero-buttons">
                <h1 className="title has-text-primary hero-buttons">
                  Whatever you're looking for, you can find it NEARHERE.
                </h1>
              </div>
              <div className="field is-grouped is-grouped-centered hero-buttons">
                <p className="control">
                  <Link to='/login'>
                    <a className="button is-primary is-inverted hero-buttons">
                      Login
                    </a>
                  </Link>
                </p>
                <p className="control">
                  <Link to='/register'>
                    <a className="button is-primary is-inverted hero-buttons">
                      Register
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

  export default Index;