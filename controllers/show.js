var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res) {
	var search = req.query.search;
	request(
		'http://api.nal.usda.gov/ndb/search/?format=json&q=' + search + '&sort=r&max=100&offset=0&api_key=' + process.env.USDA_KEY,
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.render('show', {data: data}) ;
			} else {
				res.send(error);
			}
		}
	)
});

module.exports = router;