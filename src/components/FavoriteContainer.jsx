import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react'
import axios from 'axios'
import FavoriteMap from './FavoriteMap.jsx'
import FavoriteMarker from './FavoriteMarker.jsx'
import FavoriteInfoWindow from './FavoriteInfoWindow.jsx'
import querystring from 'querystring'
import { Redirect } from 'react-router-dom';

export class FavoriteContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: true,
      activeMarker: {},
      selectedPlace: {},
      dataLoaded: false,
      marker: false
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.getFavorite = this.getFavorite.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.getMapCoordinates = this.getMapCoordinates.bind(this);
    this.getSearchQuery = this.getSearchQuery.bind(this);
    this.getResultSet = this.getResultSet.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.mapCoords;
    this.searchQuery;
    this.resultSet;
    this.zoom = 13;
    this.marker;
  }

  componentWillMount(){
    this.getFavorite();
  }

  componentDidUpdate() {
    this.getUserLocation();
  }

  getFavorite() {
    axios.get('/map/favorites', {
    params: {
      user: localStorage.getItem('token')
    }
  })
    .then(result => {
      this.getUserLocation();
      this.getMapCoordinates(result.data[0].latitude, result.data[0].longitude);
      this.getSearchQuery(result.data[0].query);
      this.getResultSet(result.data[0]);
      this.setState({dataLoaded: true});
    })
  }

  getMapCoordinates(lat, lng) {
    this.mapCoords = {lat: lat, lng: lng}
  }

  getUserLocation() {
    if (navigator && navigator.geolocation) {
        const key = -1;
        const colorKey = 0;
        const object = {"name": "Current Location"};
        navigator.geolocation.getCurrentPosition((pos) => {
            const position = {lat: pos.coords.latitude, lng: pos.coords.longitude};
            this.marker = <FavoriteMarker key={key} colorKey={colorKey} locationInfo={object} position={position} onClick={this.onMarkerClick} />
            this.setState({marker: true});
        }, () => {
            this.marker = <FavoriteMarker />
            this.setState({marker: false});
          })
    } else {
      this.marker = <FavoriteMarker />
      this.setState({marker: false});
    }
  }

  getSearchQuery(searchQuery) {
    this.searchQuery = searchQuery;
  }

  getResultSet(resultSet) {
    this.resultSet = resultSet;
  }

  renderMarker(marker) {
    const key = 0;
    const colorKey = 1;
    return (
      <FavoriteMarker key={key} colorKey={colorKey} locationInfo={marker} position={this.mapCoords} onClick={this.onMarkerClick} />
    )
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      dataLoaded: true,
      showingInfoWindow: true
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
  const homeMarker = this.marker;
  const mapMarker = this.renderMarker(this.resultSet);
  const rating = (this.state.selectedPlace.rating > 0) ? this.state.selectedPlace.rating + " / 5" : "No ratings available!";

  if (!localStorage.getItem('token')) {
      return(
        <Redirect to="/" />
      )
    }

  if (!mapMarker || !this.mapCoords || !this.props.google || !homeMarker) {
    return (
      <h1>Loading map...</h1>
      )
    }
  else {
    return (
      <div style={style}>
        <FavoriteMap google={this.props.google} onClick={this.onMapClick} initialCenter={this.mapCoords} zoom={this.zoom}>
          { homeMarker }
          { mapMarker }
          <FavoriteInfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}
            onOpen={this.onInfoWindowOpen}>
            <div>
              <p className="is-size-5"><strong>{this.state.selectedPlace.name}</strong></p>
              <br />
              <p className="is-size-6"><strong>Address:</strong> {this.state.selectedPlace.address}</p>
              <p className="is-size-6"><strong>Rating:</strong> {rating}</p>
            </div>
          </FavoriteInfoWindow>
        </FavoriteMap>
      </div>
      )
    }
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1phNKmvb9u9qrUM_EGMW-EbfiANLLjbY',
  version: '3.29'
})(FavoriteContainer)