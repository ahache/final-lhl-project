import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import $ from 'jquery'
import SearchContainer from './SearchContainer.jsx';
import AlertContainer from 'react-alert';

const URL = "http:\//localhost:3001/filters";

class Filters extends Component {
  constructor(props){
    super(props)
    this.state = {
      filters : []
    }
    this.addFilter = this.addFilter.bind(this);
    this.deleteFilter = this.deleteFilter.bind(this);
    this.filterCount = this.filterCount.bind(this);
  }

  alertOptions = {
    offset: 50,
    position: 'top right',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }

  filterCount() {
    return this.state.filters.length;
  }

  componentDidMount() {
    $.ajax({
      url: URL,
      cache:false,
      data: {user: sessionStorage.getItem('token')}
    }).done((data) => {
      const newFilters = this.state.filters.concat(data);
      this.setState({filters: newFilters});
    });
  }

  addFilter(e) {
    const newFilter = {name: this.filter.value};
    if (this.filterCount() === 5) {
      this.msg.error('Please only use 5 filters at a time');
    } else if (!newFilter.name) {
      this.msg.error('Please enter a filter');
    } else {
      this.filter.value = '';
      $.post(URL, {user: sessionStorage.getItem('token'), filter: newFilter.name})
        .done((data) => {
          if (data) {
            newFilter['id'] = data;
            const newFilters = this.state.filters.concat(newFilter);
            this.setState({filters: newFilters});
          } else {
            this.msg.error('You already have that filter');
          }
        })
        .fail((error) => {
          console.log(error.responseText);
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
      data: {user: sessionStorage.getItem('token')},
    }).done((data) => {
      newFilters = data;
      this.setState({filters: newFilters});
    }).fail((error) => {
      console.log(error.responseText);
    });
    e.preventDefault();
  }

  render() {

    if (!sessionStorage.getItem('token')) {
      return(
        <Redirect to="/" />
      )
    }

    const style = {
      // width: 'auto',
      height: 'max-content',
      // textAlign: 'center',
      textAlign: '-webkit-center',
      backgroundColor: '#e6fff2'
    }

    const inputStyle = {
      marginBottom: '18.76px'
    }

    const filterStyle = {
      margin: '18.76px 5px 0 5px'
    }

    const headerStyle = {
      marginTop: '18.76px'
    }

    const bgColor = {
      backgroundColor: "#ff3860"
    }

    const filterSpan = this.state.filters.map((filter, i) => {
      const normalized = filter.name[0].toUpperCase().concat(filter.name.slice(1).toLowerCase());
      return (
        <span className='tag is-medium is-white' key={i} style={filterStyle} >
          {normalized}
          <button style={bgColor} className='delete is-medium' name={filter.id} onClick={this.deleteFilter}></button>
        </span>
      );
    })

    return (
      <section className="hero is-fullheight is-primary is-bold">
        <div className="hero-body">
          <div className='box content column is-half is-offset-one-quarter' style={style}>
            <h2 style={headerStyle}>What do you want to find nearby?</h2>
            <form className="filters" onSubmit={this.addFilter}>
              <div>
                <input
                  className='input is-primary column is-11'
                  id='filter-input'
                  style={inputStyle}
                  type='text'
                  name="filter"
                  placeholder="Enter some interests..."
                  ref={(filter) => this.filter = filter}
                />
              </div>
              <div>
                <input className="button is-focused" type="submit" value='Add Filter' />
              </div>
            </form>
            {filterSpan}
            <SearchContainer filterCount={this.filterCount}/>
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          </div>
        </div>
      </section>
    );
  }
}

export default Filters;