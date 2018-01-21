import React, { Component } from 'react';
// import YelpApi from 'v3-yelp-api';

//This will take the foodArr as props and make the AJAX call to Yelp, so we'll probably need axios or something
//Also need to set up a loading screen
class SummaryComponent extends Component {
  componentWillMount(){
    let displayText = this.props.selection.mood ? "So, you're feeling good ": "So, okay, you're having a rough one..."
    this.props.selection.weather ? displayText += "and it's balmy out there. " : displayText += "and it's chilly outside. "
    this.props.selection.healthy ? displayText += "You're looking for some nourishment " : displayText += "You seem like a salad person "
    this.props.selection.spicy ? displayText += "and we gotchu: hot, spicy food floats your boat. " : displayText += "and we gotchu: you're not into hot stuff, hot stuff. "
    
    this.setState({
      text: displayText
    })
  }
  render() {
    return (
    <div className="magic openDownLeft">
      <div className="summary-title">This is what we're working with:</div> 
      <div className="summary">
        <p>
        {this.state.text}
        </p>
      </div>
      <div className="sweep-to-right summary-button" onClick={() => {this.props.nextStep()}}>
        LET'S GET YOU FED
      </div>
    </div>
    );
  }
}

export default SummaryComponent;
