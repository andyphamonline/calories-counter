var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	res.render('add');
});

// //request works for json file with search term (i.e.sausage); but not all sausages right now
// router.get('/', function(req, res) {
// 	request(
// 		'http://api.nal.usda.gov/ndb/search/?format=json&q=sausage&sort=n&max=25&offset=0&api_key=' + process.env.USDA_KEY,
// 		function(error, response, body) {
// 			if (!error && response.statusCode === 200) {
// 				var data = JSON.parse(body);
// 				res.send(data);
// 			}
// 		}
// 	)
// });




module.exports = router;