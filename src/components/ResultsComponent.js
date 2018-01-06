import React, { Component } from 'react';

//This will take the foodArr as props and make the AJAX call to Yelp, so we'll probably need axios or something
//Also need to set up a loading screen
class ResultsComponent extends Component {
  componentWillMount(){
    let displayText;
  }
  render() {
    return (
    <div>
      Your resutls are loading.
    </div>
    );
  }
}

export default ResultsComponent;
