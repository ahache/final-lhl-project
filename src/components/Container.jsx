import React from 'react'
import {InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Map from './Map.jsx'

export class Container extends React.Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div style={style}>
        <Map google={this.props.google}
          />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBR9a87huIRF93xhp5VcW57S7mBjfFGEKk',
  version: '3.29'
})(Container)
