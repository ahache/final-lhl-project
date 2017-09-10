import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';

const URL = "http:\//localhost:3001/filters";

class Filters extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_email : "hi@gmail.com",
      filters : []
    }
  }

  componentDidMount (){
    $.get(URL + '/1')
    .done((data) => {
      const newFilters = this.state.filters.concat(data);
      this.setState({filters: newFilters});
    })
  }
  render() {
    const style = {
      width: 'auto',
      textAlign: 'center'
    }

    const filterSpan = this.state.filters.map(filter => {
      return (<p>{filter.name}</p>);
    })

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
        {filterSpan}
      </div>
    );
  }
}

export default Filters;