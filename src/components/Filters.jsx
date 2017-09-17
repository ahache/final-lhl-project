import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import $ from 'jquery'
import SearchContainer from './SearchContainer.jsx';

const URL = "http:\//localhost:3001/filters";


class Filters extends Component {
  constructor(props){
    super(props)
    this.state = {
      filters : []
    }
    this.addFilter = this.addFilter.bind(this);
    this.deleteFilter = this.deleteFilter.bind(this);
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
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
    if (!newFilter.name) {
      alert("Please enter something");
    } else {
      this.filter.value = '';
      $.post(URL, {user: localStorage.getItem('token'), filter: newFilter.name})
        .done((data) => {
          if (data) {
            newFilter['id'] = data;
            const newFilters = this.state.filters.concat(newFilter);
            $(".submit-button").closest('form').find("input[name=filter]").val("");
            this.setState({filters: newFilters});
          } else {
            alert('You already have that filter');
          }
        })
        .fail((error) => {
          // alert(error.responseText);
        });
    }
    e.preventDefault();
  }

  deleteFilter(e) {
    const deleteURL = URL + `/${e.target.name}`;
    let newFilters = this.state.filters;
    $.ajax({
      url: deleteURL,
      type: 'DELETE',
      data: {user: localStorage.getItem('token')},
    }).done((data) => {
      newFilters = data;
      this.setState({filters: newFilters});
    }).fail((error) => {
      alert(error.responseText);
    });
    e.preventDefault();
  }

  addClass(e) {
    e.target.className = 'button is-danger';
  }

  removeClass(e) {
    e.target.className = 'button is-info';
  }

  render() {

    if (!localStorage.getItem('token')) {
      return(
        <Redirect to="/login" />
      )
    }

    const style = {
      width: 'auto',
      textAlign: 'center'
    }

    const filterStyle = {
      margin: '18.76px 5px 0 5px'
    }

    const inputStyle = {
      width: '35%'
    }

    const filterSpan = this.state.filters.map((filter, i) => {
      return (
        <input 
          className='button is-info'
          type='button' 
          style={filterStyle} 
          name={filter.id} 
          value={filter.name} 
          key={i} 
          onMouseOver={this.addClass}
          onMouseOut={this.removeClass}
          onClick={this.deleteFilter} 
        />
      );
    })

    return (
      <div className='field' style={style}>
        <h1>What Are You Looking For?</h1>
        <form className="filters" onSubmit={this.addFilter}>
          <input 
            className='input' 
            style={inputStyle} 
            type='text' 
            name="filter" 
            placeholder="Food, Fashion, Fitness..." 
            ref={(filter) => this.filter = filter}
          />
          <input className="button is-primary" type="submit" value='Add Filter' />
        </form>
        <p className="help is-danger">Select filter to delete</p>
        {filterSpan}
        <SearchContainer />
      </div>
    );
  }
}

export default Filters;
