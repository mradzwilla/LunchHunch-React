import React, { Component } from 'react';
import StartMenuComponent from '../components/StartMenuComponent.js'

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
            {(this.state.step == 0) ? <StartMenuComponent/> : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
