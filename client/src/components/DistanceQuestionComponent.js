import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

const PrettoSlider = withStyles({
  root: {
    color: 'crimson',
    height: 8,
    maxWidth: 800
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

class DistanceQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	range: 10,
    	latitude: '',
    	longitude: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleOnChange(e, value){
    //Need to set this state so slider will move
    this.setState({
      range: value
    });

    // //Yelp API requires distance in meters
    var distanceInMeters = value * 1609.34
    this.props.updateParentState({
      range: distanceInMeters,
    })
  }
  handleClick(){
    this.props.nextStep()

    //Yelp API requires distance in meters
    var distanceInMeters = this.state.range * 1609.34
    this.props.updateParentState({
      range: distanceInMeters,
    })

  }


  render() {
  	let { range } = this.state
  	return(
  	  <div>
  	  <h1>How far do you want to go?</h1>
  	  <div>{range} miles</div>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="distance slider"
        defaultValue={range}
        min={0}
        max={30}
        onChange={this.handleOnChange}
      />

      <button className="next_button" onClick={() => {this.handleClick()}}>Submit</button>
      </div>
      )
  }
}

export default DistanceQuestionComponent;

// <Slider
// 	min={1}
// 	max={25}
// 	step={1}
//   value={range}
//   orientation="horizontal"
//   onChange={this.handleOnChange}
// />
