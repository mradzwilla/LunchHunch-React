import React, { Component } from 'react';
import logo from '../images/logo.png';
import yelp_logo from  '../images/yelp_logo.png';

class StartMenuComponent extends Component {
  render() {
    return (
    <div>
      <img id="logo" class="animated bounce" src={logo} width="300" alt="OK"/>
        <div class="question">
        <a id="start_btnz" data-remote="true" rel="nofollow">FIND ME A PLACE TO EAT</a>    
          <div id="yelp-logo">
            <span>Powered by  </span>
            <img src={yelp_logo} alt="Yelp!"/>
          </div>
        </div>
    </div>
    );
  }
}

export default StartMenuComponent;
