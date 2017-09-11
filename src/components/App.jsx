import React, { Component } from 'react';
import '../App.css';
import NavBar from './NavBar.jsx';
import Main from './Main.jsx';
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super()
    this.state = { users: [] }
    this.onLogin = this.onLogin.bind(this);
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
      </div>
    );
  }
}

export default App;
