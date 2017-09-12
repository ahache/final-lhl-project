import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';

const URL = "http:\//localhost:3001/filters";

class Filters extends Component {
  constructor(props){
    super(props)
    this.state = {
      filters : []
    }

    this.addFilter = this.addFilter.bind(this);
  }

  componentDidMount() {
    // axios({
    //   method: 'GET',
    //   url: URL,
    //   data: {
    //     user: localStorage.getItem('token')
    //   }
    // })
    // $.post(URL, {user: localStorage.getItem('token')})
    //   .done();
    $.get(URL, {user: localStorage.getItem('token')})
      .done((data) => {
        const newFilters = this.state.filters.concat(data);
        this.setState({filters: newFilters});
      })
  }

  addFilter(e){
    const newFilter = this.filter.value;
    const newFilters = this.state.filters.concat(newFilter);
    if (!newFilter) {
      alert("Fields must not be empty");
    } else {
      $.post(URL, {user: localStorage.getItem('token'), filter: newFilter})
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
          <input type='text' name="filter" placeholder="Tacos" ref={(filter) => this.filter = filter}/>
          <button type="submit">Add</button>
        </form>
        {filterSpan}
      </div>
    );
  }
}

export default Filters;