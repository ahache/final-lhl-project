import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios'
import querystring from 'querystring'

const URL = 'http:\//localhost:3000/favorites/all';

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
      this.setState({favorites: newFavorites})
      // console.log(this.state.favorites);
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

  //TODO: onClick={this.deleteFavorite},<input className='delete-button' name={favorite.id} type='button' value="X" />
  render(){
    const style = {
      margin: 'auto',
      width: 'fit-content',
      textAlign: 'left'
    }

    const boxStyle = {
      // width: '50%'
    }

    const buttonMargin = {
      'margin-right': '4px'
    }

    const headerStyle = {
      'margin-top': '14px'
    }

    let newQuery = '';
    let currQuery = '';
    const favoritesList = this.state.favorites.map((favorite, i) => {
      if(currQuery !== this.state.favorites[i].query){
        newQuery = favorite.query;
        currQuery = favorite.query;
      }
      else{
        newQuery = null
      }
      // Temporarily removed -- <p>Rating: {favorite.rating}</p>
      return (
        <div>
          <h2 className='query_header' style={headerStyle}>{newQuery}</h2>
          <div className='box' style={boxStyle}>
            <h3>{favorite.name}</h3>
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
      <div className='content box' style={style}>
        {favoritesList}
      </div>
    );
  }
}

export default Favorites;