import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import '../App.css';
import NavBar from './NavBar.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super()
    this.state = { users: [] }
  }

  render() {
    const style = {
      width: 'auto',
      textAlign: 'center'
    }

    return (
      <div>
        <NavBar />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
