import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';

const URL = "http:\//localhost:3001/filters";

class Filters extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id : 1,
      filters : []
    }
  }

  componentDidMount (){
    $.get(URL + '/' + this.state.user_id)
    .done((data) => {
      const newFilters = this.state.filters.concat(data);
      this.setState({filters: newFilters});
    })
  }

  addFilter(e){
    const filter = this.interest.value;
    const newFilters = this.state.filters.concat(filter);
    if (!filter) {
      alert("Fields must not be empty");
    } else {
      $.post(URL + '/' + this.state.user_id, {filter: filter})
        .done((data) => {
          this.setState({filters: newFilters})
          console.log(data, " posted");
        });
    }
    e.preventDefault();
  }

  render() {
    const style = {
      width: 'auto',
      textAlign: 'center'
    }

    const filterSpan = this.state.filters.map((filter, i) => {
      return (<p key={i}>{filter.name}</p>);
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
        <form onSubmit={this.addFilter}>
          <input type='text' name="interests" placeholder="Tacos" ref={(interest) => this.interest = interest}/>
          <button type="submit">Add</button>
        </form>
        {filterSpan}
      </div>
    );
  }
}

export default Filters;
