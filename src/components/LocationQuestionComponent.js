import React, { Component } from 'react';

class LocationQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showZip: false
    };
    this.toggleZipField = this.toggleZipField.bind(this)
    this.updateZip = this.updateZip.bind(this)
  }
  toggleZipField(){
    this.setState({
      showZip: !this.state.showZip
    })
  }
  updateZip(event){
    this.setState({
      zip: event.target.value
    })
  }
  handleClick(){
    this.props.getCoordinates();
    this.props.nextStep();
  }
  render() {
    //Render will be a button with the get coordinates method
    //Or a button to display a regular zip input
  	return(
  	  <div>
  	  <h1>What is your location</h1>
      <button onClick={() => {this.handleClick()}}>Get Coordinates</button>
      <a onClick={this.toggleZipField}>Enter manually</a>
      {(this.state.showZip) ?
        <div>
        <input placeholder='Zip' onChange={this.updateZip}></input> 
        <button>Submit</button>
        </div>
        : ''
       }
      </div>
      )
  }
}

export default LocationQuestionComponent;

