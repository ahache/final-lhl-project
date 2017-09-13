import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import SearchContainer from './SearchContainer.jsx';
const URL = "http:\//localhost:3001/filters";
const mapURL = "http:\//localhost:3001/map";

class Filters extends Component {
  constructor(props){
    super(props)
    this.state = {
      filters : []
    }
    this.addFilter = this.addFilter.bind(this);
    this.getMapResults = this.getMapResults.bind(this);
  }

  componentDidMount() {
    $.get(URL, {user: localStorage.getItem('token')})
      .done((data) => {
        const newFilters = this.state.filters.concat(data);
        this.setState({filters: newFilters});
      });
  }

  addFilter(e) {
    const newFilter = {name: this.filter.value};
    const newFilters = this.state.filters.concat(newFilter);
    if (!newFilter) {
      alert("Fields must not be empty");
    } else {
      $.post(URL, {user: localStorage.getItem('token'), filter: newFilter.name})
        .done((data) => {
          this.setState({filters: newFilters});
        })
        .fail((error) => {
          console.log(error.responseText);
        });
    }
    e.preventDefault();
  }

  getMapResults(e) {
    const destination = this.destination.value;
    if (!destination) {
      alert("Must input destination");
    } else {
      $.post(mapURL, {user: localStorage.getItem('token'), destination: destination})
        .done((data) => {
          console.log(data);
        })
        .fail((error) => {
          console.log(error.responseText);
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
        <form onSubmit={this.getMapResults}>
          <h1> Where are you going? </h1>
          <SearchContainer />
          <h2> How are you getting around? </h2>
          <div>
            <input type='radio' value="Walking" />Walking distance
          </div>
          <div>
            <input type='radio' value="Biking" />Biking distance
          </div>
          <div>
            <input type='radio' value="Driving" />Driving distance
          </div>
          <button type="submit">See Map</button>
        </form>
        <h2>What are you interested in?</h2>
        <form onSubmit={this.addFilter}>
          <input type='text' name="filter" placeholder="Tacos" ref={(filter) => this.filter = filter}/>
          <button type="submit">Add</button>
        </form>
        {filterSpan}
      </div>
    );
  }
}

export default Filters;
