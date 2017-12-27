import React, { Component } from 'react';

class LocationQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    //Render will be a button with the get coordinates method
    //Or a button to display a regular zip input
  	return(
  	  <div>
  	  <h1>What is your location</h1>
      <button onClick={() => {this.props.getCoordinates()}}>Get Coordinates</button>
      </div>
      )
  }
}

export default LocationQuestionComponent;

