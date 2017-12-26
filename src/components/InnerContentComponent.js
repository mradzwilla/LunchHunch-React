import React, { Component } from 'react';
import StartMenuComponent from '../components/StartMenuComponent'
import DistanceQuestionComponent from '../components/DistanceQuestionComponent'

//This component's render switches on the current step of the form to return the appropriate component
class InnerContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }
  render() {
    switch (this.state.step){
      case 0:
        return <StartMenuComponent/>
      case 1:
        return <DistanceQuestionComponent/>
      default:
        return <StartMenuComponent/>
    }

  }
}

export default InnerContentComponent;