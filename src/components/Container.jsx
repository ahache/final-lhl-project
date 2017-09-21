import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react'
import axios from 'axios'
import Map from './Map.jsx'
import Marker from './Marker.jsx'
import InfoWindow from './InfoWindow.jsx'
import querystring from 'querystring'
import { Redirect } from 'react-router-dom';

export class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      dataLoaded: false,
      keyword: ''
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
    this.getGoogleSearch = this.getGoogleSearch.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
    this.getMapCoordinates = this.getMapCoordinates.bind(this);
    this.createHomeMarker = this.createHomeMarker.bind(this);
    this.getSearchQuery =   this.getSearchQuery.bind(this);
    this.getResultSet = this.getResultSet.bind(this);
    this.buttonId = '';
    this.buttonText = '';
    this.buttonClass = '';
    this.mapMarkers;
    this.mapCoords;
    this.searchQuery;
    this.resultSet;
    this.zoom = 13;
  }

  componentWillMount(){
    this.getGoogleSearch();
  }

  getGoogleSearch() {
    axios.get('/map', {
      params: {
        user: localStorage.getItem('token')
      }
    })
    .then(result => {
      this.getMapCoordinates(result.data[0]);
      this.getSearchQuery(result.data[1]);
      this.getResultSet(result.data[2]);
      this.setState({dataLoaded: true});
    })
  }

  getMapCoordinates(mapCoords) {
    this.mapCoords = {lat: mapCoords[0], lng: mapCoords[1]}
  }

  getSearchQuery(searchQuery) {
    this.searchQuery = searchQuery;
  }

  getResultSet(resultSet) {
    this.resultSet = resultSet;
  }

  createHomeMarker(location) {
    const key = -1;
    const colorKey = 0;
    return <Marker key={key} colorKey={colorKey} position={location} />
  }

  renderMarkers(result) {
    let markers = [];
    let newResult;
    let count = 0;
    let filterNum = 0;
    for (let filter in result) {
      filterNum += 1;
      newResult = result[filter].map((place, i) => {
        count += 1;
        return (
          <Marker key={count} colorKey={filterNum} keyword={filter} locationInfo={place} position={place.geometry.location} checkFavorite={this.checkFavorite} onClick={this.onMarkerClick} />
        )
      })
      markers = markers.concat(newResult);
    }
    return markers;
  }

  onMarkerClick(props, keyword, marker, e) {
    this.setState({
      selectedPlace: props,
      keyword: keyword,
      activeMarker: marker
    });
    this.checkFavorite(props.place_id);
  }

  checkFavorite(place_id) {
  axios.get('/favorites', {
    params: {
      user: localStorage.getItem('token'),
      place_id: place_id
    }
  })
  .then(result => {
    if (Number(result.data[0].count) > 0) {
      this.buttonId = 'remove';
      this.buttonText = 'Remove from Favorites'
      this.buttonClass = 'button is-danger is-small'
    }
    else {
      this.buttonId = 'add';
      this.buttonText = 'Add to Favorites'
      this.buttonClass = 'button is-primary is-small'
    }
    this.setState({showingInfoWindow:true});
  });
  }

  addFavorite () {
   this.buttonId = '';
   this.buttonText = 'Adding...';
   axios.post('/favorites/add', querystring.stringify({
      user: localStorage.getItem('token'),
      address: this.state.selectedPlace.formatted_address,
      name: this.state.selectedPlace.name,
      place_id: this.state.selectedPlace.place_id,
      price_level: this.state.selectedPlace.price_level,
      rating: this.state.selectedPlace.rating,
      latitude: this.state.selectedPlace.geometry.location.lat,
      longitude: this.state.selectedPlace.geometry.location.lng,
      query: this.searchQuery
    }))
  .then(result => {
    this.buttonId = 'remove';
    this.buttonText = 'Remove from Favorites';
    this.buttonClass = 'button is-danger is-small';
    this.setState({showingInfoWindow:true});
  });
  }

  removeFavorite () {
   this.buttonId = '';
   this.buttonText = 'Removing...';
   axios.delete('/favorites/remove/', {params:
    {
      user: localStorage.getItem('token'),
      place_id: this.state.selectedPlace.place_id
    }
  })
  .then(result => {
    this.buttonId = 'add';
    this.buttonText = 'Add to Favorites';
    this.buttonClass = 'button is-primary is-small';
    this.setState({showingInfoWindow:true});
  });
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  onInfoWindowOpen() {
    this.setState({
      showingInfoWindow: true
    });
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
  const homeMarker = this.createHomeMarker(this.mapCoords);
  const mapMarkers = this.renderMarkers(this.resultSet);
  const rating = (this.state.selectedPlace.rating > 0) ? this.state.selectedPlace.rating + " / 5" : "No ratings available!"

  if (!localStorage.getItem('token')) {
      return(
        <Redirect to="/" />
      )
    }

    if (mapMarkers !== [] && this.mapCoords) {
      return (
      <div style={style}>
        <Map google={this.props.google} onClick={this.onMapClick} initialCenter={this.mapCoords} zoom={this.zoom}>
          { homeMarker }
          { mapMarkers }
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}
            addFavorite={this.addFavorite}
            removeFavorite={this.removeFavorite}
            onOpen={this.onInfoWindowOpen}>
              <div>
                <p className="is-size-5"><strong>{this.state.selectedPlace.name}</strong></p>
                <br />
                <p className="is-size-6"><strong>Address:</strong> {this.state.selectedPlace.formatted_address}</p>
                <p className="is-size-6"><strong>Rating:</strong> {rating}</p>
                <br />
                <p className="is-size-6"><em>This matches your search for: <strong>{this.state.keyword}</strong></em></p>
                <br />
                <button className={this.buttonClass} id={this.buttonId}>{this.buttonText}</button>
              </div>
          </InfoWindow>
        </Map>
      </div>
    )
    }
    else {
      return (
      <h1>Loading map...</h1>
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB5GDa5558nr1BrKFxboyA5lBw-9-RiAFc',
  version: '3.29'
})(Container)
