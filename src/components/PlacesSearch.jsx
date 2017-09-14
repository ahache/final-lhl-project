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
    const radius = $('input[name=radius]:checked').val();
    if (!destination || !radius) {
      alert("Must input destination and distance ");
    } else {
      $.post(mapURL, {user: localStorage.getItem('token'), destination: destination, radius: radius})
        .done((data) => {
          console.log(data);
        })
        .fail((error) => {
          console.log(error.responseText);
        });
    }
    e.preventDefault();
  }

  render(){
    return (
<<<<<<< HEAD
      <input ref='autocomplete' id="pac-input" className="controls" type="text" placeholder="Search Box" ref={(destination) => this.destination = destination}/>
=======
      <form onSubmit={this.getMapResults}>
        <h1> Where are you going? </h1>
          <input ref='autocomplete' id="pac-input" className="controls" type="text" placeholder="Search Box" />  
        <h2> How are you getting around? </h2>
        <div>
          <input type='radio' name="radius" value="1000" />Walking distance
        </div>
        <div>
          <input type='radio' name="radius" value="4000" />Biking distance
        </div>
        <div>
          <input type='radio' name="radius" value="8000" />Driving distance
        </div>
        <button type="submit">See Map</button>
      </form>
      
>>>>>>> bfcd6e3f6f21b223f1fc249ef1614ae61b19ca04
    )
  }

}

export default PlacesSearch;
