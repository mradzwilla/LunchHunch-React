'use strict';

import React, { Component } from 'react';
import axios from 'axios'
import yelp from 'yelp-fusion'

//This will take the foodArr as props and make the AJAX call to Yelp, so we'll probably need axios or something
//Also need to set up a loading screen
class ResultsComponent extends Component {
  componentWillMount(){
    let foodArr = this.props.foodArray
    const credentials = {
      appId:"ZfGYX0nCdDKn2XDrDowC7g",
      appSecret: "bseZwVmZ0jfbBcZjtt96bygcpgH8K6HckPlP4X8KS9INBwns0kmbi90MGFCHq5pT"
    }
    let apiKey = "gw3MOvphtNJ4hT006ZEdCQ2kX-m972JTOH_Zx85nAGgGcWYug4jLuWWWF_B461qkoVOjRL6o3RzZmtYnt6qwzTjzfOdBxmogyHF-_fxZASC_l04bLqOGAzfLE3ZSWnYx"

  const client = yelp.client(apiKey);

    client.search({
      term:'Four Barrel Coffee',
      location: 'san francisco, ca'
    }).then(response => {
      console.log(response.jsonBody.businesses[0].name);
    }).catch(e => {
      console.log(e);
    });

  }
  render() {
    //Return loader if undefined
    return (
    <div>
      Here are your results
    </div>
    );
  }
}

export default ResultsComponent;
