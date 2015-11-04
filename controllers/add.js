var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	res.render('add', {data:null});
});

//request works for json file with search term (i.e.sausage); but not all sausages right now


router.post('/', function(req, res) {
	var search = req.body.search;
	var url = 'http://api.nal.usda.gov/ndb/search/?format=json&q=' + search + '&sort=r&max=100&offset=0&api_key=' + process.env.USDA_KEY;
	request(
		url,
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.render('add', {data: data}) ;
			} else {
				res.send(error);
			}
		}
	)
});




module.exports = router;