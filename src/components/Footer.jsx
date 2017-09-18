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
    );
  }
}

export default Footer;
