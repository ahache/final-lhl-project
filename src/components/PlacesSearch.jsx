import React from 'react'
import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import camelize from '../javascript/camelize.js'
import $ from 'jquery'

const mapURL = "http:\//localhost:3001/map";

export class PlacesSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      googleLoad: false,
      lastSearch: ''
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

  componentDidMount() {
    $.get(`${mapURL}/last`, {user: localStorage.getItem('token')})
      .done((data) => {
        const lastSearch = data[0].last_search;
        this.setState({lastSearch: lastSearch});
      })
      .fail((error) => {
        console.log(error.responseText);
      });

  }

  getMapResults(e) {
    if (this.props.filterCount() === 0) {
      alert("Please Enter Some Filters");
    } else {
      const destination = this.refs.autocomplete.value || this.state.lastSearch;
      $.post(mapURL, {user: localStorage.getItem('token'), destination: destination})
        .done((data) => {
          console.log(data);
          this.props.history.push('/map');
          // window.location = '/map';
        })
        .fail((error) => {
          console.log(error.responseText);
        });      
    }
    e.preventDefault();
  }

  render(){

    const inputStyle = {
      // width: '35%'
      'margin-bottom': '18.76px'
    }

    return (
      <form onSubmit={this.getMapResults}>
        <h1>Where are you going?</h1>
        <input 
          ref='autocomplete' 
          id="pac-input" 
          style={inputStyle} 
          className="input is-primary controls" 
          type="text" 
          placeholder={this.state.lastSearch}
        />
        <input type="submit" className='button is-info' value='See Results' />
      </form>
    )
  }
}

export default withRouter(PlacesSearch);
