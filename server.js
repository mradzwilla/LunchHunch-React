'use strict';

const express = require('express')
const app = express()
const yelp = require('yelp-fusion');
const apiKey = "gw3MOvphtNJ4hT006ZEdCQ2kX-m972JTOH_Zx85nAGgGcWYug4jLuWWWF_B461qkoVOjRL6o3RzZmtYnt6qwzTjzfOdBxmogyHF-_fxZASC_l04bLqOGAzfLE3ZSWnYx";
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
	// const distance = req.query.distance

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
		  longitude: longitude
		}).then(response => {
		  	return res.json(response.body)
		}).catch(e => {
		  console.log(e);
		});
  	} else {
 		client.search({
		  categories: foodArr,
		  location: zip
		}).then(response => {
		  	return res.json(response.body)
		}).catch(e => {
		  console.log(e);
		});	
  	}

});

app.listen(app.get('port'), () => console.log('Example app listening on port 3000!'))