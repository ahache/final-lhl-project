import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import logo from './static_html/LOGO_CONCEPT.png'
import video from './static_html/hero-video-2.mp4'
import Footer from './Footer.jsx';
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
    const videoStyle = {
      paddingTop: '0',
      paddingBottom: '0',
      height: '100%',
      width: '177.77777778vh',
      minWidth: '100%',
      minHeight: '56.25vw',
    }

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
      <h1 className="title has-text-primary">
        Whatever you're looking for, you can find it NearHere.
      </h1>

    <div className="level-item has-text-centered hero-buttons">
      <div className="columns is-mobile is-fullheight is-centered">
        <div className="column is-centered">
          <div className="field is-grouped is-grouped-centered">
          <p className="control">
            <Link to='/login'><input className="button is-primary" type="submit" value="Login" /></Link>
          </p>
          </div>
        </div>
        <div className="column is-centered">
          <div className="field is-grouped is-grouped-centered">
           <p className="control">
              <Link to='/register'><input className="button is-primary" type="submit" value="Register" /></Link>
          </p>
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>
      </section>
        <Footer />
        </div>
      );
  }
}

  export default Index;