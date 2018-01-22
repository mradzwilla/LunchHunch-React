import React, { Component } from 'react';
import Client from "../Client"; //Handles call to server to connect with Yelp
import shuffle from 'shuffle-array';
import {Carousel} from 'react-responsive-carousel';
import {RiseLoader} from 'halogenium';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class ResultsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    };
    this.nextBusiness = this.nextBusiness.bind(this)
    this.createCarousel = this.createCarousel.bind(this)
    this.getRatingUrl = this.getRatingUrl.bind(this)
  }

  componentWillMount(){
    let foodArr = 'foodArr=' + this.props.foodArray
    console.log(this.props)
    let location = this.getLocationQuery();
    var self = this

    if (this.props.latitude && this.props.longitude){
      location = 'latitude=' + this.props.latitude + '&longitude=' + this.props.longitude
    } else if (this.props.zip) {
      location = 'zip=' + this.props.zip
    }

    let priceQuery = 'price=' + this.props.price
    let distanceQuery = 'distance=' + this.props.distance 
    let queryString = foodArr + '&' + location + '&' + priceQuery + '&' + distanceQuery

    //Argument to client should be a query string
    Client.search(queryString, resp => {
      var response = JSON.parse(resp)
      var businesses = shuffle(response['businesses'])
      //Need to throw an error if resp['total'] = 0, handle error
      //More info on the resp object here: https://www.yelp.com/developers/documentation/v3/business_search
      var currentBusiness = businesses[0]

      businesses.map((business) => {
        if (!business.hasOwnProperty('photos')){
          business['photos'] = [business.image_url]
        }
      })
      let photosQueryString = location + "&businessId=" + currentBusiness['id']

      self.getPhotos(currentBusiness, photosQueryString)
      this.setState({
        index: 0,
        businesses: businesses
      });
    });
  }
  getLocationQuery(){
    var location;
    if (this.props.latitude && this.props.longitude){
      location = 'latitude=' + this.props.latitude + '&longitude=' + this.props.longitude
    } else if (this.props.zip) {
      location = 'zip=' + this.props.zip
    }
    return location
  }

  getPhotos(businessObj, queryString){

    Client.getPhotos(queryString, resp => {
      var response = JSON.parse(resp)
      var photos = response.photos
      var businesses = this.state.businesses
      var index = this.state.index
      var currentPhoto = businesses[index]['photos'][0]

      //One image is returned from original API call
      //Sort the photos so that the first displayed is the same as the one already shown on the page
      for (let i=0;i<photos.length;i++){
        if (photos[i] === currentPhoto){
          let photo = photos[i]
          photos.splice(i, 1)
          photos.unshift(photo)
          break;
        }
      }
      businesses[index]['photos'] = photos
      this.setState({
        businesses: businesses
      })
    })
  }

  nextBusiness(){
    var newIndex = this.state.index + 1
    var nextBusiness = this.state.businesses[newIndex]

    //If there are no more options, go back to beginning
    if (!nextBusiness){
      newIndex = 0; 
      nextBusiness = this.state.businesses[0]
    }

    //If next business does not have all photos, get them
    if (nextBusiness.photos.length <= 1){
      let location = this.getLocationQuery()
      let queryString = location + "&businessId=" + nextBusiness['id']
      this.getPhotos(nextBusiness, queryString)
    }

    this.setState({
      index: newIndex
    })
  }
  createCarousel(currentBusiness){
    if (currentBusiness.hasOwnProperty('photos')){
      return (
        <Carousel showArrows={true} >
          {   currentBusiness.photos.map((photoPath, index) => {
                return (
                  <div>
                    <img src={photoPath} />
                    <p className="legend">Legend {index}</p>
                  </div>
                )
              })
          }
        </Carousel>
      )
    } else {
      return (
        <div>
          <img src={currentBusiness.image_url} />
          <p className="legend">Legend 1</p>
        </div>
      )
    }
  }

  getRatingUrl(rating){
   //rating_img_url (used in original project) has been deprecated in new Yelp API
   //Now we need to match busines rating to correct image path
   switch (rating){
    case 1:
      return "images/yelp_stars/regular_1@3x.png"
    case 1.5:
      return "images/yelp_stars/regular_1_half@3x.png"
    case 2:
      return "images/yelp_stars/regular_2@3x.png"
    case 2.5:
      return "images/yelp_stars/regular_2_half@3x.png"
    case 3:
      return "images/yelp_stars/regular_3@3x.png"
    case 3.5:
      return "images/yelp_stars/regular_3_half@3x.png"
    case 4:
      return "images/yelp_stars/regular_4@3x.png"
    case 4.5:
      return "images/yelp_stars/regular_4_half@3x.png"
    case 5:
      return "images/yelp_stars/regular_5@3x.png"
    default:
      return "images/yelp_stars/regular_0@3x.png"
   }
  }
  render() {
      if (this.state.businesses.length <= 0){
      //Return loader if undefined
      return (
        <div>
          <RiseLoader className="loader" color="crimson" size="18px" margin="4px"/>
        </div>
      ) 
      } else {
      var currentBusiness = this.state.businesses[this.state.index]

      return (
      <div>
        <div className="restaurant-name">
          DUDE, WHY DON'T YOU GO TO <br />
          <span className="choice-for-today">
            <a href={currentBusiness.url} target="_blank">
              {currentBusiness.name}
            </a>
          </span>
          <br/>
        </div>
        <div className="result-body-container">
          <div className="result-body-left">
            <div className="restaurant-carousel">
              {
                <Carousel showArrows={true} showStatus={true} showIndicators={true} showThumbs={false}>
                  { currentBusiness.photos.map((photoPath, index) => {
                      return (
                        <div key={index}>
                          <img src={photoPath} />
                        </div>
                      )
                    })
                  }
                </Carousel>
              }
            </div>
          </div>
          <div className="result-body-right">
            <img className="rating" src={this.getRatingUrl(currentBusiness.rating)} alt="Rating images"/><br />
            <div>{currentBusiness.review_count} reviews <span className="price">{currentBusiness.price}</span></div>
            <a href={"tel:" + currentBusiness.phone}>{currentBusiness.display_phone}</a><br />
            <div className="address">
              <div>{currentBusiness.location.display_address[0]}</div>
              <div>{currentBusiness.location.display_address[1]}</div>
            </div>
          </div>
        </div>
        <a className="search-again" onClick={() => {this.nextBusiness()}}>
          NO, THAT PLACE LOOKS BAD
        </a>
      </div>
      );
    }
  }
}

export default ResultsComponent;