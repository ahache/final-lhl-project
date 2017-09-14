import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react'
import axios from 'axios'
import Map from './Map.jsx'
import Marker from './Marker.jsx'
import InfoWindow from './InfoWindow.jsx'

export class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
		this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
		this.onMapClick = this.onMapClick.bind(this);
    this.onAddToFavorites = this.onAddToFavorites.bind(this);
  }

  onMarkerClick(props, marker, e) {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});
	}

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
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
    // const pos = {lat: 37.759703, lng: -122.428093}
    // const pos_one = {lat: 38.759703, lng: -122.428093}
    // const pos_two = {lat: 39.759703, lng: -122.428093}
          //     <Marker position={pos} onClick={this.onMarkerClick} />
          // <Marker position={pos_one} onClick={this.onMarkerClick} />
          // <Marker position={pos_two} onClick={this.onMarkerClick} />

    const testData =
    { formatted_address: '908 Stewart St, Seattle, WA 98101, United States',
    geometry: { location: {lat: 39.759703, lng: -122.428093}, viewport: [Object] },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    id: 'db3a1e206138a3253716bf6887d85c3e6ca9d6c4',
    name: 'Taco Del Mar',
    opening_hours: { open_now: true, weekday_text: [] },
    photos: [ [Object] ],
    place_id: 'ChIJxakRgUoVkFQRsa7zEea5agM',
    price_level: 2,
    rating: 3.5,
    reference: 'CmRRAAAAmxPORwYQOikEwxqgokDgVPH06lKOUfssTMV9aXwyh9eGZ88KnZ3CHIZMXdbhq6DrBi2Ukmbihh5SBQC9ED1547TAQvx26Ujr1B2_0V0brZYaa458UgoEmfSu7KxtzLyXEhC-lRmFbwxOE3D0fb8hvaYUGhQndLBFcBzkecxb2qlaGipnM_KwMQ',
    types: [ 'restaurant', 'food', 'point_of_interest', 'establishment' ] }

    return (
      <div style={style}>
        <Map google={this.props.google} onClick={this.onMapClick}>
          <Marker locationInfo={testData} position={testData.geometry.location} onClick={this.onMarkerClick} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}
            addFavorite={this.onAddToFavorites}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
                <button id="favorite">Add to Favorites</button>
              </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBR9a87huIRF93xhp5VcW57S7mBjfFGEKk',
  version: '3.29'
})(Container)
