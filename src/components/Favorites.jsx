import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios'
import querystring from 'querystring'

const URL = 'http:\//localhost:3000/favorites/all';

export class Favorites extends Component {

  constructor(props){
    super(props)
    this.state = {
      favorites: [],
      favoritesObj: {},
      selection: ''
    }
    this.changeSelection = this.changeSelection.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentDidMount(){
    $.ajax({
      url: URL,
      cache:false,
      data: {user: localStorage.getItem('token')}
    }).done((data) => {
      // Build the incoming data into an object keyed by search query
      let favoritesObj = {};
      for (let result of data) {
        if(favoritesObj[result['query']]) {
          favoritesObj[result['query']].push(result);
        } else {
          favoritesObj[result['query']] = [result];
        }
      }
      const selection = Object.keys(favoritesObj)[0];
      this.setState({favoritesObj: favoritesObj, selection: selection});
    });
  }

  deleteFavorite(e){
    let favoriteID = e.target.name;
    let query = e.target.dataset.query;
    axios.delete('/favorites/remove/', {params:
      {
        user: localStorage.getItem('token'),
        place_id: favoriteID
      }
    })
    .then((result) => {
      let favoritesObj = this.state.favoritesObj;
      favoritesObj[query] = favoritesObj[query].filter((favorite) => {
        return (favorite.place_id !== favoriteID);
      });
      this.setState({favoritesObj: favoritesObj});
    })
  }

  viewMap(e){
    let favoriteID = e.target.name;
    axios.post('/favorites/setfavorite', querystring.stringify({
      user: localStorage.getItem('token'),
      place_id: favoriteID
    }))
    .then(() => {
      window.location = '/favoritesmap';
    })
  }

  toggle() {
    $('.dropdown').toggleClass('is-active');
  }

  changeSelection(event) {
    const query = event.target.value;
    this.setState({selection: query});
    this.toggle();
    event.preventDefault();
  }

  render() {

    const style = {
      margin: 'auto',
      width: 'fit-content',
      textAlign: 'left',
      backgroundColor: '#e6fff2'
    }

    const boxStyle = {
      marginTop: '14px'
    }

    const buttonMargin = {
      marginRight: '4px'
    }

    const headerStyle = {
      marginTop: '14px'
    }

    const dropDownMenu = Object.keys(this.state.favoritesObj).map((query, i) => {
      return (
        <div className="dropdown-item" key={i}>
          <input
            className='button is-info is-outlined'
            type='button'
            value={query}
            onClick={this.changeSelection}
          />
        </div>
      )
    });

    let favoritesList;
    if (this.state.selection) {
      favoritesList = this.state.favoritesObj[this.state.selection].map((favorite, i) => {
        return (
          <div>
            <div className='box' style={boxStyle}>
              <h4>{favorite.name}</h4>
              <h6>{favorite.address}</h6>
              <input
                style={buttonMargin}
                className='button is-success'
                name={favorite.place_id}
                type='button'
                value='View Map'
                onClick={this.viewMap}
              />
              <input
                className='button is-danger'
                name={favorite.place_id}
                data-query={favorite.query}
                type='button'
                value='Remove'
                onClick={this.deleteFavorite}
              />
            </div>
          </div>
        );
      });
    }

    return(
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className='content box' style={style}>
            <div className="dropdown">
              <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.toggle}>
                  <span>Which location?</span>
                  <span className="icon is-small">
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  {dropDownMenu}
                </div>
              </div>
            </div>
            <h2 className='query_header' style={headerStyle}>{this.state.selection}</h2>
            {favoritesList}
          </div>
        </div>
      </section>
    );
  }
}

export default Favorites;