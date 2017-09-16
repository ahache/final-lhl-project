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
    if (!newFilter) {
      alert("Fields must not be empty");
    } else {
      $.post(URL, {user: localStorage.getItem('token'), filter: newFilter.name})
        .done((data) => {
          if (data) {
            newFilter['id'] = data;
            const newFilters = this.state.filters.concat(newFilter);
            $(".submit-button").closest('form').find("input[name=filter]").val("");
            this.setState({filters: newFilters});
          } else {
            alert('you already did it');
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

    const filterSpan = this.state.filters.map((filter, i) => {
      return (
        <div>
          <p key={i}>{filter.name}</p>
          <input className='delete-button' name={filter.id} type='button' value="X" onClick={this.deleteFilter} />
        </div>
      );
    })

    return (
      <div style={style}>
        <SearchContainer />
        <h2>What are you interested in?</h2>
        <form className="filters" onSubmit={this.addFilter}>
          <input type='text' name="filter" placeholder="Tacos" ref={(filter) => this.filter = filter}/>
          <button className="submit-button" type="submit">Add</button>
        </form>
        {filterSpan}
      </div>
    );
  }
}

export default Filters;
