'use strict';

const express = require('express')
const app = express()
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY
console.log(apiKey)
const client = yelp.client(apiKey);

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/results', (req, res) => {
	//Next we need to take the food arr as a parameter here and modify the API call
	const foodArr = req.query.foodArr;
	const latitude = req.query.latitude;
	const longitude = req.query.longitude;
	const zip = req.query.zip
	const price = req.query.price
	const distance = req.query.distance

	if (!foodArr) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  	}

  	if (latitude && longitude){
		client.search({
		  categories: foodArr,
		  latitude: latitude,
		  longitude: longitude,
		  price: price,
		  distance: distance
		}).then(response => {
		  	return res.json(response.body)
		}).catch(e => {
		  console.log(e);
		});
  	} else {
 		client.search({
		  categories: foodArr,
		  location: zip,
		  price: price,
		  distance: distance
		}).then(response => {
		  	return res.json(response.body)
		}).catch(e => {
		  console.log(e);
		});	
  	}
});

app.get('/api/photos', (req, res) => {
	var businessId = req.query.businessId
	client.business(businessId).then(response => {
	  return res.json(response.body)
	}).catch(e => {
	  console.log(e);
	});
})
app.listen(app.get('port'), () => console.log('Example app listening on port 3000!'))