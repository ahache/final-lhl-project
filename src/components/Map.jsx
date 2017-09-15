import React from 'react'
import ReactDOM from 'react-dom'
import camelize from '../javascript/camelize.js'

export class Map extends React.Component {
  constructor(props){
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      mapLoaded: false,
      currentLocation: {
        lat: lat,
        lng: lng,
      }
    }
  }

  renderChildren() {
    const {children} = this.props;
    // return null so that if we use the map w/o children
    // our component won't blow up
    if (!children) return;

    return React.Children.map(children, c => {
      /*
      cloneElement() accepts an element and creates a copy,
      which gives us the opportunity to append props and/or children
      to the child. We can use this to append map instance plus the google prop.
      Now each of the Map component's children will receive the original props they
      were passed plus the map instance, google api instance and mapCenter from the
      <Map /> component.
      */
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  loadMap() {
    if (this.props && this.props.google && this.props.mapReady) {
      // if google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      // This refers to the ref='map' in render
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      this.setState({mapLoaded: true});
      /* MESSAGES FROM MATT:
      This code deals with dragging the map and having a callback for it,
      when the user finishes dragging the map, we can do something with that!
      One issue is that we don't to be handling the callback that many times
      since the user is likely to drag A LOT. So we can set the callback to only
      be called at the end. We can create a limit to the times we'll call onMove()
      and can do this for many different types of events!
      */
      // let centerChangedTimeout;
      /*
      If we wanted to deal with many types of events that get handled the same we
      can do something like const eventNames = ['click', 'dragend']
      */
      const eventNames = ['ready', 'click', 'dragend'];
      eventNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });
      // After the map is ready, can use a trigger function on the map instance
      // and because we've already set up the rest of the event handlers, this will just work.
      maps.event.trigger(this.map, 'ready');
    }
  }

  /*
  Basically any time we pass a prop with an event name (such as click) it will
  get called whenever we click on the map itself. Note: This is not very React-like (or JS-like).
  Going meta here.
  */
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

  componentWillMount() {
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

// Here I'm explicitly saying what types my props will be, this is supposedly good practice!
Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool,
  onMove: React.PropTypes.func
}

// Setting default values on my props
Map.defaultProps = {
  onMove: function() {},
  zoom: 13,
  // Vancouver, by default
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  centerAroundCurrentLocation: false
}

export default Map;
