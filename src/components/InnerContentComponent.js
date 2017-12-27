import React, { Component } from 'react';
import StartMenuComponent from '../components/StartMenuComponent';
import LocationQuestionComponent from '../components/LocationQuestionComponent';
import DistanceQuestionComponent from '../components/DistanceQuestionComponent';
 
//This component's render switches on the current step of the form to return the appropriate component
class InnerContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
    this.getCoordinates = this.getCoordinates.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  getCoordinates(){
    alert('GETT')
    var showPosition = (position) => {
      this.setState({
      coordinates:{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    })
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
  }  
  nextStep(){
    console.log('Next step')
    this.setState({
      step: this.state.step + 1
    })
  }
  render() {
    switch (this.state.step){
      case 0:
        return <StartMenuComponent nextStep={this.nextStep}/>
      case 1:
        return <LocationQuestionComponent getCoordinates={this.getCoordinates} nextStep={this.nextStep}/>
      case 2:
        return <DistanceQuestionComponent/>
      default:
        return <StartMenuComponent/>
    }

  }
}

export default InnerContentComponent;