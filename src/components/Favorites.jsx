import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios'

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
    $.get(URL, {user: localStorage.getItem('token')})
    .done((data) => {
      let userFavorites;
      if(data.length > 0){
        userFavorites = this.state.favorites.concat(data);
      }
      else{
        userFavorites = [];
      }
      this.setState({favorites: userFavorites});
    });
  }

  deleteFavorite(e){
    let favoriteID = e.target.name
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
      console.log(this.state.favorites);
    })
  }


  //TODO: onClick={this.deleteFavorite},<input className='delete-button' name={favorite.id} type='button' value="X" />
  render(){
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
      return (
        <div>
          <h1 className='query_header'>{newQuery}</h1>
          <p>{favorite.name}</p>
          <p>{favorite.address}</p>
          <p>rating: {favorite.rating}</p>
          <input className='delete-button' name={favorite.place_id} type='button' value="X" onClick={this.deleteFavorite} />
        </div>
      );
    })
    return(
      <div>
        {favoritesList}
      </div>
    );
  }
}

export default Favorites;