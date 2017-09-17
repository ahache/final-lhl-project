import React from 'react'
import ReactDOM from 'react-dom'
import {GoogleApiWrapper} from 'google-maps-react';
import PlacesSearch from './PlacesSearch.jsx'

export class SearchContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  // componentDidMount(){
  //    var searchBox = maps.places.SearchBox(node);
  //   searchBox.addListener('places_changed', function() {
  //         var places = searchBox.getPlaces();

  //         if (places.length == 0) {
  //           return;
  //         }

  // }
  // }

  render() {
    return(
      <PlacesSearch google={this.props.google} getDest={this.props.getDest} />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env['API_KEY'],
  version: '3.29'
})(SearchContainer)
