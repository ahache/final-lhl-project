import React from 'react'
import {InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import Map from './Map.jsx'
import Marker from './Marker.jsx'

export class Container extends React.Component {
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
        <Map google={this.props.google}>
          <Marker />
          <Marker position={pos} />
          <Marker position={pos_one} />
          <Marker position={pos_two} />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBR9a87huIRF93xhp5VcW57S7mBjfFGEKk',
  version: '3.29'
})(Container)
