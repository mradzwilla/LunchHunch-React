import React, { Fragment } from "react";
import {RiseLoader} from 'halogenium';
import { geolocated } from "react-geolocated";

class GeolocationComponent extends React.Component {

  componentDidUpdate(){
    if (this.props.coords){
      //Callback sets parent state and advance next step
      this.props.setCoordinates(this.props.coords)
    }
  }
  render() {
      return !this.props.isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation. Please enter your zip code.</div>
      ) : !this.props.isGeolocationEnabled ? (
          <div>There was an error trying to get your location. Please enter your zip code. </div>
      ) : this.props.coords ? (
          <Fragment>
            <h3>Got it!</h3>
            <button className="next_button" onClick={()=> {this.props.nextStep()}}>Continue</button>
          </Fragment>
      ) : (
        <RiseLoader className="loader" color="crimson" size="18px" margin="4px"/>
      );
  }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(GeolocationComponent);
