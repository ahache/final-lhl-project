import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

class Footer extends React.Component {

render() {
  const height = {
    padding: "2.5rem 1.5rem 2rem"
  }
  return (
    <footer className="footer" style={height}>
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>NEARHERE &copy;2017</strong>. This app was lovingly created by Lighthouse Labs graduates <a href="https://github.com/ahache" target="_blank">Alex H.</a>, <a href="https://github.com/hounslow" target="_blank">Matt H.</a>,  <a href="https://github.com/jonosue" target="_blank">Jonathan S.</a>, and <a href="https://github.com/MattWillcox" target="_blank">Matt W.</a> It is currently in beta.
          </p>
          <p>
              <a className="icon" href="https://github.com/hounslow/final-lhl-project" target="_blank">
                <i className="fa fa-github"></i>
              </a>
              <a className="icon" href="https://play.google.com/store/apps/details?id=com.cbfc.nearhere" target="_blank">
                <i className="fa fa-google"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
