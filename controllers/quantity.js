var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/:id', function(req, res) {
	var id = req.params.id;
	request(
		'http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=ejl5haOAJvW06Tlx5EiZ3kuBdKCZEaS0vM53SPsM&nutrients=203&nutrients=204&nutrients=205&ndbno=' + id,
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.render('quantity', {data: data});
			}
		}
	)
});






module.exports = router;