import React, { Component } from 'react';
import Client from "../Client"; //Handles call to server to connect with Yelp

//Also need to set up a loading screen
class ResultsComponent extends Component {
  componentWillMount(){
    let foodArr = 'foodArr=' + this.props.foodArray
    let location;
    if (this.props.latitude && this.props.longitude){
      location = 'latitude=' + this.props.latitude + '&longitude=' + this.props.longitude
    } else if (this.props.zip) {
      location = 'zip=' + this.props.zip
    } else {
      //This should never happen
      alert('props missing')
    }

    let queryString = foodArr + '&' + location
    //Argument to client should be a query string
    //I will need to pair the values with their keys here
    Client.search(queryString, foods => {
      console.log(foods)
      this.setState({
        foods: 'okokok'
      });
    });
  }
  render() {
    //Return loader if undefined
    return (
    <div>
      Here are your results
    </div>
    );
  }
}

export default ResultsComponent;
