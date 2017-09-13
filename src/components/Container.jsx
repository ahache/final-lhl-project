import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react';
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
    const pos = {lat: 37.759703, lng: -122.428093}
    const pos_one = {lat: 38.759703, lng: -122.428093}
    const pos_two = {lat: 39.759703, lng: -122.428093}

    return (
      <div style={style}>
        <Map google={this.props.google} onClick={this.onMapClick}>
          <Marker />
          <Marker position={pos} onClick={this.onMarkerClick} />
          <Marker position={pos_one} onClick={this.onMarkerClick} />
          <Marker position={pos_two} onClick={this.onMarkerClick} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}>
            <div>
              <h1>Header</h1>
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
