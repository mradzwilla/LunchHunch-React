import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'; // To include the default styles

class DistanceQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	range: 10,
    	latitude: '',
    	longitude: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(value){
    //Need to set this state so slider will move
    this.setState({
      range: value
    });

    this.props.updateParentState({
      range: value,
    })
  }
  render() {
  	let { range } = this.state
  	return(
  	  <div>
  	  <h1>How far do you want to go?</h1>
  	  <div>{range} miles</div>
      <Slider
      	min={1}
      	max={25}
      	step={1}
        value={range}
        orientation="horizontal"
        onChange={this.handleOnChange}
      /> 
      <button onClick={() => {this.props.nextStep()}}>Submit</button> 	
      </div>
      )
  }
}

export default DistanceQuestionComponent;

