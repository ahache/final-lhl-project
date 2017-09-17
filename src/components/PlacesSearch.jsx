import React from 'react'
import ReactDOM from 'react-dom'
import camelize from '../javascript/camelize.js'
import $ from 'jquery'

const mapURL = "http:\//localhost:3001/map";

export class PlacesSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      googleLoad: false
    }
    this.getMapResults = this.getMapResults.bind(this);
  }

  loadSearch(){
    if (this.props && this.props.google) {
      // if google is available
      const {google} = this.props;
      const maps = google.maps;
      const node = ReactDOM.findDOMNode(this.refs.autocomplete);
      const searchBox = new maps.places.SearchBox(node);
      // searchBox.addListener('places_changed', function() {
      //     let places = searchBox.getPlaces();
      //     console.log(places[0].formatted_address);
      //     if (places.length == 0) {
      //       return;
      //     }
      //   });
      this.setState({googleLoad: true})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadSearch();
    }
  }

  getMapResults(e) {
    const destination = this.refs.autocomplete.value;
    if (!destination) {
      alert("Must input destination and distance ");
    } else {
      $.post(mapURL, {user: localStorage.getItem('token'), destination: destination})
        .done((data) => {
          console.log(data);
          window.location = '/map';
        })
        .fail((error) => {
          console.log(error.responseText);
        });
    }
    e.preventDefault();
  }

  render(){

    const inputStyle = {
      width: '35%'
    }

    return (
      <form onSubmit={this.getMapResults}>
        <h1>Where are you going?</h1>
        <input ref='autocomplete' id="pac-input" style={inputStyle} className="input is-primary controls" type="text" placeholder="Enter any location" />
        <input type="submit" className='button is-info' value='See Results' />
      </form>

    )
  }

}

export default PlacesSearch;
