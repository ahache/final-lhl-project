import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Filters extends Component {
  render() {
    const style = {
      width: 'auto',
      textAlign: 'center'
    }

    return (
      <div style={style}>
        <h1> Where are you going? </h1>
        <input type='text' name="destination" placeholder="Vancouver" />
        <h2> How are you getting around? </h2>
        <form>
          <div>
            <input type='radio' value="Walking" />Walking distance
          </div>
          <div>
            <input type='radio' value="Biking" />Biking distance
          </div>
          <div>
            <input type='radio' value="Driving" />Driving distance
          </div>
        </form>
        <h2>What are you interested in?</h2>
        <input type='text' name="interests" placeholder="Tacos" />
        <button>Add</button>
      </div>
    );
  }
}

export default Filters;