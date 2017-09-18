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
    const markerTwo = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_orange+.png';
    const markerThree = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue+.png';
    const markerFour = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow+.png';
    const markerFive = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_purple+.png';

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

    if (Number(this.props.colorKey) === 2) {
      let pos = position || mapCenter;
      if (!(pos instanceof google.maps.LatLng)) {
        position = new google.maps.LatLng(pos.lat, pos.lng);
      }
      const pref = {
        map: map,
        position: position,
        icon: markerTwo
      };
      this.marker = new google.maps.Marker(pref);

      eventNames.forEach(e => {
        this.marker.addListener(e, this.handleEvent(e));
      })
    }

    if (Number(this.props.colorKey) === 3) {
      let pos = position || mapCenter;
      if (!(pos instanceof google.maps.LatLng)) {
        position = new google.maps.LatLng(pos.lat, pos.lng);
      }
      const pref = {
        map: map,
        position: position,
        icon: markerThree
      };
      this.marker = new google.maps.Marker(pref);

      eventNames.forEach(e => {
        this.marker.addListener(e, this.handleEvent(e));
      })
    }

    if (Number(this.props.colorKey) === 4) {
      let pos = position || mapCenter;
      if (!(pos instanceof google.maps.LatLng)) {
        position = new google.maps.LatLng(pos.lat, pos.lng);
      }
      const pref = {
        map: map,
        position: position,
        icon: markerFour
      };
      this.marker = new google.maps.Marker(pref);

      eventNames.forEach(e => {
        this.marker.addListener(e, this.handleEvent(e));
      })
    }

    if (Number(this.props.colorKey) === 5) {
      let pos = position || mapCenter;
      if (!(pos instanceof google.maps.LatLng)) {
        position = new google.maps.LatLng(pos.lat, pos.lng);
      }
      const pref = {
        map: map,
        position: position,
        icon: markerFive
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

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}

export default Marker;