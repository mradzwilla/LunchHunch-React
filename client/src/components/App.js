import React, { Component } from 'react';
import InnerContentComponent from '../components/InnerContentComponent.js';
import Results from '../components/ResultsComponent.js';
import Test from '../components/Test.js';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="content-box">
            <div className="header"/>
            <div className="content">
              <div className="body">
              <Switch>
                <Route exact path='/' component={ InnerContentComponent } />
                <Route exact path='/results' component={ Results } />
                <Route render={() => <Redirect to="/"/>}/>
              </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>

    );
  }
}

export default App;
