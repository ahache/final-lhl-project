import React from 'react'
import ReactDOM from 'react-dom'
import camelize from '../javascript/camelize.js'

export class Map extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      mapLoaded: false
    }
  }

  renderChildren() {
    const {children} = this.props;
    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.props.initialCenter
      });
    });
  }

  loadMap() {
    if (this.props && this.props.google) {
      // if google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      // This refers to the ref='map' in render
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.props.initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      console.log("center", center, "zoom", zoom, "lat", lat, "lng", lng);
      this.map = new maps.Map(node, mapConfig);
      this.setState({mapLoaded: true});

      const eventNames = ['ready', 'click', 'dragend'];
      eventNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });
      maps.event.trigger(this.map, 'ready');
    }
  }

  handleEvent(eventName) {
    let timeout;
    const handlerName = `on${camelize(eventName)}`;
    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    };
  }

  // componentDidMount() {
  //   if (this.props.centerAroundCurrentLocation) {
  //     if (navigator && navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((pos) => {
  //         const coords = pos.coords;
  //         this.setState({
  //           currentLocation: {
  //             lat: coords.latitude,
  //             lng: coords.longitude
  //           }
  //         })
  //       })
  //     }
  //   }
  //   this.loadMap();
  // }

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    // if (prevState.currentLocation !== this.state.currentLocation) {
    //   this.recenterMap();
    // }
  }

  // Only called when currentLocation in component's state is updated
  // recenterMap() {
  //   const map = this.map;
  //   const current = this.state.currentLocation;

  //   const google = this.props.google;
  //   const maps = google.maps;

  //   if (map) {
  //     let center = new maps.LatLng(current.lat, current.lng);
  //     // Using panTo(center) to change the center of the map
  //     map.panTo(center);
  //   }

  // }

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div ref='map' style={style}>
        Loading map...
        {this.renderChildren()}
      </div>
    )
  }
}

Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  // centerAroundCurrentLocation: React.PropTypes.bool,
  // onMove: React.PropTypes.func
}

Map.defaultProps = {
  // onMove: function() {},
  // zoom: 13,
  // Vancouver, by default
  // initialCenter: {
  //   lat: this.props.initialCenter[0],
  //   lng: this.props.initialCenter[1]
  // },
  // centerAroundCurrentLocation: false
}

export default Map;
