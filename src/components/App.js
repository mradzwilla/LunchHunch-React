import React, { Component } from 'react';
import InnerContentComponent from '../components/InnerContentComponent.js'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }
  render() {
    return (
      <div className="App">
        <div id="content-box">
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
