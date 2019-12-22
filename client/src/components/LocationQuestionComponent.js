import React, { Component } from 'react';
import {RiseLoader} from 'halogenium';

class LocationQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showZip: false,
      gettingCoordinates: false
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
    this.props.updateParentState({
      zip: event.target.value
    })
  }
  handleClick(){
    this.setState({
      gettingCoordinates: true
    })
    this.props.getCoordinates();
    //nextStep call has been moved to async getCoordinates function
  }
  render() {
    //Render will be a button with the get coordinates method
    //Or a button to display a regular zip input

  	return(
  	  <div className="locationQuestion">
  	  <h1>What is your location?</h1>
      { (this.state.gettingCoordinates) ?
          <div>
          <div>Getting your location</div>
          <RiseLoader className="loader" color="crimson" size="18px" margin="4px"/>
          </div> :
          <button className="next_button" onClick={() => {this.handleClick()}}>Get Coordinates</button>
      }
      <div className="ctaText" onClick={this.toggleZipField}>Enter manually</div>
      {(this.state.showZip) ?
        <div className="zipForm">
        <input placeholder='Zip' onChange={this.updateZip}></input>
        <button className="next_button" onClick={()=> {this.props.nextStep()}}>Submit</button>
        </div>
        : ''
       }
      </div>
      )
  }
}

export default LocationQuestionComponent;
