import React, { Component } from 'react';
import '../App.css';
import NavBar from './NavBar.jsx';
import Main from './Main.jsx';
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super()
    this.state = { users: [] }
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
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
        <div className="App">
          <h1>Users</h1>
          {this.state.users.map(user =>
            <div key={user.id}>{user.username}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;