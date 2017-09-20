import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios'
import querystring from 'querystring'

const URL = 'https:\//chrisboshfanclub.herokuapp.com/favorites/all';

export class Favorites extends Component {

  constructor(props){
    super(props)
    this.state = {
      favorites: []
    }
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentDidMount(){
    $.ajax({
      url: URL,
      cache:false,
      data: {user: localStorage.getItem('token')}
    }).done((data) => {
      let userFavorites;
      if(data.length > 0) {
        userFavorites = this.state.favorites.concat(data);
      } else {
        userFavorites = [];
      }
      this.setState({favorites: userFavorites});
    });
  }

  deleteFavorite(e){
    let favoriteID = e.target.name;
    axios.delete('/favorites/remove/', {params:
      {
        user: localStorage.getItem('token'),
        place_id: favoriteID
      }
    })
    .then((result) => {
      let newFavorites = this.state.favorites.filter((favorite) => {
        return (favorite.place_id !== favoriteID);
      })
      this.setState({favorites: newFavorites});
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

  render() {

    const style = {
      margin: 'auto',
      width: 'fit-content',
      textAlign: 'left',
      backgroundColor: '#e6fff2'
    }

    const boxStyle = {
      // width: '50%'
    }

    const buttonMargin = {
      marginRight: '4px'
    }

    const headerStyle = {
      marginTop: '14px'
    }

    let newQuery = '';
    let currQuery = '';
    const favoritesList = this.state.favorites.map((favorite, i) => {
      if(currQuery !== this.state.favorites[i].query) {
        newQuery = favorite.query;
        currQuery = favorite.query;
      } else {
        newQuery = null
      }
      return (
        <div>
          <h2 className='query_header' style={headerStyle}>{newQuery}</h2>
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
              type='button'
              value='Remove'
              onClick={this.deleteFavorite}
            />
          </div>
        </div>
      );
    })
    return(
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className='content box' style={style}>
            {favoritesList}
          </div>
        </div>
      </section>
    );
  }
}

export default Favorites;
