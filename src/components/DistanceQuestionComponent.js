import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'; // To include the default styles

class DistanceQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	range: 0,
    	latitude: '',
    	longitude: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this)
    this.getCoordinates= this.getCoordinates.bind(this)
  }
  componentWillMount(){
  }
  getCoordinates(){
  	var showPosition = (position) => {
	  	this.setState({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
  	}
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  handleOnChange(value){
    this.setState({
      range: value
    })
  }
  render() {
  	let { range } = this.state
  	return(
  	  <div>
  	  <h1>How far do you want to go?</h1>
      <Slider
        value={range}
        orientation="horizontal"
        onChange={this.handleOnChange}
      />  	
      </div>
      )
  }
}

export default DistanceQuestionComponent;

