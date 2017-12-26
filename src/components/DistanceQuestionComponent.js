import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'; // To include the default styles

class DistanceQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	range: 0,
    	zip: null
    };
    this.handleOnChange = this.handleOnChange.bind(this)
    this.getCoordinates= this.getCoordinates.bind(this)
  }
  componentDidMount(){
  	this.getCoordinates();
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
    } else {
        alert('Not supported')
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

