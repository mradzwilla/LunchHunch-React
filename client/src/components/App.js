import React, { Component } from 'react';
import { Home } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import InnerContentComponent from '../components/InnerContentComponent.js';
import Results from '../components/ResultsComponent.js';

import { BrowserRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="content-box">
            <div className="header">
              <Link to={{
                pathname: '/',
                state: {
                  step: 0
                }
              }}>
                <IconButton
                  aria-label="home"
                  className="home_button"
                >
                  <Home
                    style={{ color: '#ffffff' }}
                    fontSize="large"
                  />
                </IconButton>
              </Link>
            </div>
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
