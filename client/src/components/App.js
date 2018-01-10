import React, { Component } from 'react';
import InnerContentComponent from '../components/InnerContentComponent.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="content-box">
          <div id="header"/>
          <div id="content">
            <div id="body">
              <InnerContentComponent/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
