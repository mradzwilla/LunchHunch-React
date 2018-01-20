import React, { Component } from 'react';
import Client from "../Client"; //Handles call to server to connect with Yelp
import shuffle from 'shuffle-array'

//Also need to set up a loading screen
class ResultsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    };
    this.nextBusiness = this.nextBusiness.bind(this)
  }

  componentWillMount(){
    let foodArr = 'foodArr=' + this.props.foodArray
    console.log(this.props)
    let location = this.getLocationQuery();
    console.log(location)
    var self = this

    if (this.props.latitude && this.props.longitude){
      location = 'latitude=' + this.props.latitude + '&longitude=' + this.props.longitude
    } else if (this.props.zip) {
      location = 'zip=' + this.props.zip
    } else {
      alert('whoops')
    }

    let queryString = foodArr + '&' + location
    //Argument to client should be a query string
    Client.search(queryString, resp => {
      var response = JSON.parse(resp)
      var businesses = shuffle(response['businesses'])
      //Need to throw an error if resp['total'] = 0, handle error
      //More info on the resp object here: https://www.yelp.com/developers/documentation/v3/business_search
      var currentBusiness = businesses[0]
      let photosQueryString = location + "&businessId=" + currentBusiness['id']
      // Client.getPhotos(photosQueryString, resp => {
      //   var response = JSON.parse(resp)
      //   console.log(response)
      //   currentBusiness['photos'] = response.photos
      // })
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
  // componentWillUpdate(nextProps, nextState){
  //   // if (nextState.businesses.length <= 0){return true}
  //   //   var newIndex = nextState.index
  //   //   var nextBusiness = nextState.businesses[newIndex]
  //   //   console.log('Update')
  //   //   console.log(nextBusiness)
  //   //   if (!nextBusiness.hasOwnProperty('photos')){

  //   //     console.log('Do the thing')
  //   //     nextBusiness['photos'] = ['yolo,','photos']
  //   //     return false
  //   //   }
  //   // return true
  // }
  getPhotos(businessObj, queryString){
    Client.getPhotos(queryString, resp => {
      var response = JSON.parse(resp)
      console.log(response)
      businessObj['photos'] = response.photos
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
    if (!nextBusiness.hasOwnProperty('photos')){
      let location = this.getLocationQuery()
      let queryString = location + "&businessId=" + nextBusiness['id']
      this.getPhotos(nextBusiness, queryString)
    }

    this.setState({
      index: newIndex
    })
  }
  getRatingUrl(){
   //rating_img_url has been deprecated in new Yelp API
   //This function will take the current rating and return the correct image path

   return "" 
  }
  render() {

      if (this.state.businesses.length <= 0){
      //Return loader if undefined
      return (
        <div>
          Loading your results
        </div>
      ) 
      } else {
      var currentBusiness = this.state.businesses[this.state.index]
      var ratingUrlPath = this.getRatingUrl()
      return (
      <div>
        <div className="restaurant-name">
          DUDE, WHY DON'T YOU GO TO <br />
          <span className="choice-for-today">
            <a href={currentBusiness.url}>
              {currentBusiness.name}
            </a>
          </span>
          <br/>
        </div>
        <div className="result-body-container">
          <div className="result-body-left">
            <img className="restaurant-image" src={currentBusiness.image_url}/>
          </div>
          <div className="result-body-right">
            <img className="rating" src={ratingUrlPath}/> {currentBusiness.review_count} reviews<br/>
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

/*            <img src="/assets/telephone.svg" width="18"> <%= @response.display_phone %/><br/>
          <% if @restcoords %>
            <img src="/assets/gps.svg" width="18"> Only <%= '%.2f' % @distance %/> miles from you<br/>
          <% else %>
            <img src="/assets/gps.svg" width="18"> Just around the corner<br/>
          <% end %>*/
/*This is an example of the JSON resp:
{"businesses": [{"id": "phillys-phinest-wilkes-barre", "name": "Philly's Phinest", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/QP8yUY-7JP6HqFtTzCWDsw/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/phillys-phinest-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 30, "categories": [{"alias": "pizza", "title": "Pizza"}, {"alias": "sandwiches", "title": "Sandwiches"}, {"alias": "burgers", "title": "Burgers"}], "rating": 4.0, "coordinates": {"latitude": 41.2354611, "longitude": -75.9165062}, "transactions": [], "price": "$", "location": {"address1": "610 Carey Ave", "address2": "", "address3": "", "city": "Wilkes Barre", "zip_code": "18702", "country": "US", "state": "PA", "display_address": ["610 Carey Ave", "Wilkes Barre, PA 18702"]}, "phone": "+15708294484", "display_phone": "(570) 829-4484", "distance": 2400.7071955599995}, {"id": "margarita-azul-wilkes-barre", "name": "Margarita Azul", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/vXkudKImCbqjX59QvIIIBw/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/margarita-azul-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 74, "categories": [{"alias": "mexican", "title": "Mexican"}, {"alias": "bars", "title": "Bars"}], "rating": 4.5, "coordinates": {"latitude": 41.2325444072485, "longitude": -75.90017773211}, "transactions": [], "price": "$$", "location": {"address1": "91 Parrish St", "address2": "", "address3": "", "city": "Wilkes-Barre", "zip_code": "18702", "country": "US", "state": "PA", "display_address": ["91 Parrish St", "Wilkes-Barre, PA 18702"]}, "phone": "+15708290303", "display_phone": "(570) 829-0303", "distance": 3015.94017482}, {"id": "vinos-deli-wilkes-barre", "name": "Vino's Deli", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/zo0HUhkwWm5baSFcj3aPmg/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/vinos-deli-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 21, "categories": [{"alias": "delis", "title": "Delis"}], "rating": 4.5, "coordinates": {"latitude": 41.22317, "longitude": -75.88711}, "transactions": [], "price": "$", "location": {"address1": "569 Blackman St", "address2": "", "address3": "", "city": "Wilkes Barre", "zip_code": "18702", "country": "US", "state": "PA", "display_address": ["569 Blackman St", "Wilkes Barre, PA 18702"]}, "phone": "+15708236308", "display_phone": "(570) 823-6308", "distance": 3545.965521242}, {"id": "dave-colarussos-pizza-and-pasta-hanover-township", "name": "Dave Colarusso's Pizza & Pasta", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/jNOmPAH8RMoppzxGBgdoCQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/dave-colarussos-pizza-and-pasta-hanover-township?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 7, "categories": [{"alias": "pizza", "title": "Pizza"}, {"alias": "italian", "title": "Italian"}], "rating": 4.5, "coordinates": {"latitude": 41.2339433, "longitude": -75.9229086}, "transactions": [], "price": "$$", "location": {"address1": "105 W End Rd", "address2": null, "address3": null, "city": "Hanover Township", "zip_code": "18706", "country": "US", "state": "PA", "display_address": ["105 W End Rd", "Hanover Township, PA 18706"]}, "phone": "+15708220181", "display_phone": "(570) 822-0181", "distance": 2094.726117238}, {"id": "bennys-brew-wilkes-barre", "name": "Benny's Brew", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/3AZIdR_9FqUW0h_6mkVbBg/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/bennys-brew-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 18, "categories": [{"alias": "burgers", "title": "Burgers"}, {"alias": "beerbar", "title": "Beer Bar"}, {"alias": "sandwiches", "title": "Sandwiches"}], "rating": 4.0, "coordinates": {"latitude": 41.2218870155067, "longitude": -75.9406314790249}, "transactions": [], "price": "$$", "location": {"address1": "1429 Sans Souci Pkwy", "address2": "", "address3": null, "city": "Wilkes-Barre", "zip_code": "18706", "country": "US", "state": "PA", "display_address": ["1429 Sans Souci Pkwy", "Wilkes-Barre, PA 18706"]}, "phone": "+15702356995", "display_phone": "(570) 235-6995", "distance": 1251.524011486}, {"id": "pasquales-ristorante-wilkes-barre-4", "name": "Pasquale's Ristorante", "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/RvSrLY0PvJGulpPYta3RvA/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/pasquales-ristorante-wilkes-barre-4?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 25, "categories": [{"alias": "italian", "title": "Italian"}], "rating": 4.0, "coordinates": {"latitude": 41.22681, "longitude": -75.92843}, "transactions": [], "price": "$$", "location": {"address1": "1190 San Souci Pkwy", "address2": null, "address3": "", "city": "Wilkes Barre", "zip_code": "18702", "country": "US", "state": "PA", "display_address": ["1190 San Souci Pkwy", "Wilkes Barre, PA 18702"]}, "phone": "+15708235606", "display_phone": "(570) 823-5606", "distance": 1237.428285228}, {"id": "kelseys-restaurant-ashley", "name": "Kelsey's Restaurant", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/6UgGvJ796MvNDz6iC8XOcQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/kelseys-restaurant-ashley?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 12, "categories": [{"alias": "tradamerican", "title": "American (Traditional)"}], "rating": 4.0, "coordinates": {"latitude": 41.2137773475169, "longitude": -75.8997701694431}, "transactions": [], "price": "$$", "location": {"address1": "2-8 Cemetery St", "address2": "", "address3": "", "city": "Ashley", "zip_code": "18706", "country": "US", "state": "PA", "display_address": ["2-8 Cemetery St", "Ashley, PA 18706"]}, "phone": "+15708192733", "display_phone": "(570) 819-2733", "distance": 2388.8400833339997}, {"id": "thai-thai-restaurant-wilkes-barre", "name": "Thai Thai Restaurant", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/W0vbUvlFOTzp3WnC7ZxvGw/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/thai-thai-restaurant-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 136, "categories": [{"alias": "thai", "title": "Thai"}], "rating": 4.5, "coordinates": {"latitude": 41.2447930522243, "longitude": -75.8841165602018}, "transactions": [], "price": "$$", "location": {"address1": "41 S Main St", "address2": "", "address3": "", "city": "Wilkes-Barre", "zip_code": "18701", "country": "US", "state": "PA", "display_address": ["41 S Main St", "Wilkes-Barre, PA 18701"]}, "phone": "+15708249599", "display_phone": "(570) 824-9599", "distance": 4915.04425583}, {"id": "off-the-hook-fish-and-chips-wilkes-barre", "name": "Off The Hook Fish & Chips", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/eS4hnwAgch8nKzf61m4LbA/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/off-the-hook-fish-and-chips-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 18, "categories": [{"alias": "seafood", "title": "Seafood"}, {"alias": "fishnchips", "title": "Fish & Chips"}], "rating": 4.5, "coordinates": {"latitude": 41.2395159382321, "longitude": -75.8934171513636}, "transactions": ["pickup"], "price": "$$", "location": {"address1": "369 S Main St", "address2": null, "address3": "", "city": "Wilkes-Barre", "zip_code": "18701", "country": "US", "state": "PA", "display_address": ["369 S Main St", "Wilkes-Barre, PA 18701"]}, "phone": "+15708290300", "display_phone": "(570) 829-0300", "distance": 3950.217406116}, {"id": "asian-cafe-hanover-township", "name": "Asian Cafe", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/dk0xqRjsWCof3WUyjU2bbg/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/asian-cafe-hanover-township?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 20, "categories": [{"alias": "chinese", "title": "Chinese"}, {"alias": "sushi", "title": "Sushi Bars"}, {"alias": "japanese", "title": "Japanese"}], "rating": 4.0, "coordinates": {"latitude": 41.2089749525995, "longitude": -75.9707516421874}, "transactions": [], "price": "$", "location": {"address1": "2255 Sans Souci Pkwy", "address2": "", "address3": "", "city": "Hanover Township", "zip_code": "18706", "country": "US", "state": "PA", "display_address": ["2255 Sans Souci Pkwy", "Hanover Township, PA 18706"]}, "phone": "", "display_phone": "", "distance": 3631.72193902}, {"id": "s-and-j-grocery-and-deli-ashley", "name": "S & J Grocery & Deli", "image_url": "", "is_closed": false, "url": "https://www.yelp.com/biz/s-and-j-grocery-and-deli-ashley?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 4, "categories": [{"alias": "delis", "title": "Delis"}, {"alias": "grocery", "title": "Grocery"}], "rating": 5.0, "coordinates": {"latitude": 41.21636, "longitude": -75.90064}, "transactions": [], "price": "$", "location": {"address1": "48 Ashley St", "address2": "", "address3": "", "city": "Ashley", "zip_code": "18706", "country": "US", "state": "PA", "display_address": ["48 Ashley St", "Ashley, PA 18706"]}, "phone": "+15708298188", "display_phone": "(570) 829-8188", "distance": 2303.091390388}, {"id": "bart-and-urbys-wilkes-barre-4", "name": "Bart and Urby's", "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/FzfirPb_MniE3P2VVzXX2Q/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/bart-and-urbys-wilkes-barre-4?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 38, "categories": [{"alias": "bars", "title": "Bars"}, {"alias": "tradamerican", "title": "American (Traditional)"}, {"alias": "musicvenues", "title": "Music Venues"}], "rating": 4.0, "coordinates": {"latitude": 41.243653801386, "longitude": -75.8861668340543}, "transactions": [], "price": "$$", "location": {"address1": "119 S Main St", "address2": null, "address3": null, "city": "Wilkes Barre", "zip_code": "18701", "country": "US", "state": "PA", "display_address": ["119 S Main St", "Wilkes Barre, PA 18701"]}, "phone": "+15709709570", "display_phone": "(570) 970-9570", "distance": 4702.47860528}, {"id": "hottles-restaurant-wilkes-barre", "name": "Hottle's Restaurant", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/OX28vX0Ya9_zuQOy8rKhYw/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/hottles-restaurant-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 24, "categories": [{"alias": "newamerican", "title": "American (New)"}, {"alias": "seafood", "title": "Seafood"}, {"alias": "steak", "title": "Steakhouses"}], "rating": 4.0, "coordinates": {"latitude": 41.24179, "longitude": -75.89002}, "transactions": [], "price": "$$", "location": {"address1": "243 S Main St", "address2": "", "address3": "", "city": "Wilkes Barre", "zip_code": "18701", "country": "US", "state": "PA", "display_address": ["243 S Main St", "Wilkes Barre, PA 18701"]}, "phone": "+15708257989", "display_phone": "(570) 825-7989", "distance": 4401.195190418}, {"id": "vino-dolce-hanover-township", "name": "Vino Dolce", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/d8r0GZpVFOmG5dPaO46q5Q/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/vino-dolce-hanover-township?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 19, "categories": [{"alias": "italian", "title": "Italian"}], "rating": 2.5, "coordinates": {"latitude": 41.2306439, "longitude": -75.9236013}, "transactions": [], "price": "$$$", "location": {"address1": "824 Sans Souci Pkwy", "address2": "", "address3": "", "city": "Hanover Township", "zip_code": "18706", "country": "US", "state": "PA", "display_address": ["824 Sans Souci Pkwy", "Hanover Township, PA 18706"]}, "phone": "+15708244055", "display_phone": "(570) 824-4055", "distance": 1701.8673939599998}, {"id": "circles-on-the-square-wilkes-barre", "name": "Circles On The Square", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/kpJtktnNBlR8a84Pgc24KQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/circles-on-the-square-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 42, "categories": [{"alias": "newamerican", "title": "American (New)"}, {"alias": "catering", "title": "Caterers"}], "rating": 4.0, "coordinates": {"latitude": 41.2461452, "longitude": -75.8825399}, "transactions": [], "price": "$", "location": {"address1": "9 Public Sq", "address2": "", "address3": "", "city": "Wilkes-Barre", "zip_code": "18711", "country": "US", "state": "PA", "display_address": ["9 Public Sq", "Wilkes-Barre, PA 18711"]}, "phone": "+15708294005", "display_phone": "(570) 829-4005", "distance": 5116.044062602}, {"id": "katana-wilkes-barre", "name": "Katana", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/_6rJNL8XkIC7p2iXJC63dQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/katana-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 67, "categories": [{"alias": "sushi", "title": "Sushi Bars"}, {"alias": "japanese", "title": "Japanese"}], "rating": 3.5, "coordinates": {"latitude": 41.2451980347731, "longitude": -75.8841774885818}, "transactions": [], "price": "$$", "location": {"address1": "41 S Main St", "address2": "", "address3": "", "city": "Wilkes Barre", "zip_code": "18701", "country": "US", "state": "PA", "display_address": ["41 S Main St", "Wilkes Barre, PA 18701"]}, "phone": "+15708259080", "display_phone": "(570) 825-9080", "distance": 4941.056179184}, {"id": "el-zocalo-mexican-restaurant-wilkes-barre", "name": "El Zocalo Mexican Restaurant", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/0mBRlHgbr4zfuCqdMqCSwA/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/el-zocalo-mexican-restaurant-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 18, "categories": [{"alias": "mexican", "title": "Mexican"}], "rating": 4.5, "coordinates": {"latitude": 41.2461228956504, "longitude": -75.8826391480694}, "transactions": [], "price": "$$", "location": {"address1": "21 Public Sq", "address2": "", "address3": "", "city": "Wilkes-Barre", "zip_code": "18701", "country": "US", "state": "PA", "display_address": ["21 Public Sq", "Wilkes-Barre, PA 18701"]}, "phone": "+15708223942", "display_phone": "(570) 822-3942", "distance": 5105.823627064}, {"id": "cafe-toscana-wilkes-barre", "name": "Cafe Toscana", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/TZf-TKrQyLYs2HI2uVd6vQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/cafe-toscana-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 61, "categories": [{"alias": "italian", "title": "Italian"}, {"alias": "cafes", "title": "Cafes"}], "rating": 4.0, "coordinates": {"latitude": 41.2465324265916, "longitude": -75.8825303478479}, "transactions": [], "price": "$$", "location": {"address1": "1 Public Sq", "address2": null, "address3": null, "city": "Wilkes Barre", "zip_code": "18701", "country": "US", "state": "PA", "display_address": ["1 Public Sq", "Wilkes Barre, PA 18701"]}, "phone": "+15702081252", "display_phone": "(570) 208-1252", "distance": 5142.747841222}, {"id": "canteen-park-kingston", "name": "Canteen Park", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/cVxzmMF799lVW5UjTFgmIA/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/canteen-park-kingston?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 9, "categories": [{"alias": "wine_bars", "title": "Wine Bars"}, {"alias": "cocktailbars", "title": "Cocktail Bars"}, {"alias": "sandwiches", "title": "Sandwiches"}], "rating": 5.0, "coordinates": {"latitude": 41.2510081428926, "longitude": -75.8869894093789}, "transactions": [], "price": "$$", "location": {"address1": "118 Market St", "address2": "", "address3": null, "city": "Kingston", "zip_code": "18704", "country": "US", "state": "PA", "display_address": ["118 Market St", "Kingston, PA 18704"]}, "phone": "+15703382547", "display_phone": "(570) 338-2547", "distance": 5307.36674702}, {"id": "asian-kitchen-wilkes-barre", "name": "Asian Kitchen", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/VKXQCYPjSEWbWqrTztnwCg/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/asian-kitchen-wilkes-barre?adjust_creative=ZfGYX0nCdDKn2XDrDowC7g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZfGYX0nCdDKn2XDrDowC7g", "review_count": 22, "categories": [{"alias": "chinese", "title": "Chinese"}, {"alias": "japanese", "title": "Japanese"}, {"alias": "thai", "title": "Thai"}], "rating": 3.5, "coordinates": {"latitude": 41.2437505139485, "longitude": -75.8863872450862}, "transactions": [], "price": "$", "location": {"address1": "121 S Main St", "address2": "", "address3": "", "city": "Wilkes-Barre", "zip_code": "18701", "country": "US", "state": "PA", "display_address": ["121 S Main St", "Wilkes-Barre, PA 18701"]}, "phone": "+15708220302", "display_phone": "(570) 822-0302", "distance": 4696.001494581999}], "total": 65, "region": {"center": {"longitude": -75.9282302856, "latitude": 41.2155840481}}}*/