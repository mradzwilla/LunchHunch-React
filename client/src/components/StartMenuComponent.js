import React, { Component } from 'react';
import logo from '../images/logo.png';
import yelp_logo from  '../images/yelp_logo.png';

class StartMenuComponent extends Component {
  render() {
    return (
    <div>
      <img id="logo" className="animated bounce" src={logo} width="300" alt="OK"/>
        <div className="startCopy">
        <button className="next_button" onClick={() => {this.props.nextStep()}}>FIND ME A PLACE TO EAT</button>    
          <div className="yelp-logo">
            <span>Powered by  </span>
            <img src={yelp_logo} alt="Yelp!"/>
          </div>
        </div>
    </div>
    );
  }
}

export default StartMenuComponent;
