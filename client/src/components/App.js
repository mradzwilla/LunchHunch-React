import React, { Component } from 'react';
import InnerContentComponent from '../components/InnerContentComponent.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content-box">
          <div className="header"/>
          <div className="content">
            <div className="body">
              <InnerContentComponent/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
