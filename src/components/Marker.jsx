import camelize from '../javascript/camelize.js'
/*
The Google API for markers requires that we have at LEAST a position defined,
it looks like this:
let marker = new google.maps.Marker({
  position: somePosition,
  map: map
})
*/

export class Marker extends React.Component {

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      // The relevant props have changed so our marker needs to be updated
      this.renderMarker();
    }
  }

  renderMarker() {
    const eventNames = ['click', 'mouseover'];
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);

    const pref = {
      map: map,
      position: position
    };
    this.marker = new google.maps.Marker(pref);

    eventNames.forEach(event => {
      this.marker.addListener(event, this.handleEvent(event));
    })
  }

  handleEvent(eventName) {
    return (event) => {
      const evtName = `on${camelize(eventName)}`
      if this.props[evtName]) {
        this.props[evtName](this.props, this.marker, event)
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
