import camelize from '../javascript/camelize.js'
import React from 'react'
import ReactDOM from 'react-dom'

export class FavoriteMarker extends React.Component {
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
      this.renderMarker();
    }
  }

  renderMarker() {
    const eventNames = ['click'];
    let {
      map, google, position, mapCenter
    } = this.props;

    if (!google) {
      return null;
    }

    const homeMarker = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red@.png';
    const markerOne = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green+.png';

    if (Number(this.props.colorKey) === 0) {
      let pos = position || mapCenter;
      if (!(pos instanceof google.maps.LatLng)) {
        position = new google.maps.LatLng(pos.lat, pos.lng);
      }
      const pref = {
        map: map,
        position: position,
        icon: homeMarker
      };
      this.marker = new google.maps.Marker(pref);
    }

    if (Number(this.props.colorKey) === 1) {
      let pos = position || mapCenter;
      if (!(pos instanceof google.maps.LatLng)) {
        position = new google.maps.LatLng(pos.lat, pos.lng);
      }
      const pref = {
        map: map,
        position: position,
        icon: markerOne
      };
      this.marker = new google.maps.Marker(pref);

      eventNames.forEach(e => {
        this.marker.addListener(e, this.handleEvent(e));
      })
    }
  }

  handleEvent(eventName) {
    let timeout;
    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props.onClick) {
          this.props.onClick(this.props.locationInfo, this.marker, e)
        }
      }, 0);
    };
  }

  render() {
    return null;
  }
}

FavoriteMarker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}

export default FavoriteMarker;
