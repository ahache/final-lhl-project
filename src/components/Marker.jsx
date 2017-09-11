import camelize from '../javascript/camelize.js'
import React from 'react'
import ReactDOM from 'react-dom'

export class Marker extends React.Component {
  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      if (this.marker) {
        this.marker.setMap(null);
      }
      // The relevant props have changed so our marker needs to be updated
      this.renderMarker();
    }
  }

  renderMarker() {
    const eventNames = ['click', 'mouseover'];
    let {
      map, google, position, mapCenter
    } = this.props;

    if (!google) {
      return null;
    }

    let pos = position || mapCenter;
    if (!(pos instanceof google.maps.LatLng)) {
      position = new google.maps.LatLng(pos.lat, pos.lng);
    }
    const pref = {
      map: map,
      position: position
    };
    this.marker = new google.maps.Marker(pref);

    eventNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e));
    })
  }

  handleEvent(eventName) {
    return (e) => {
      const evtName = `on${camelize(eventName)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e)
      }
    }
  }

  render() {
    return null;
  }
}

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}

export default Marker;
