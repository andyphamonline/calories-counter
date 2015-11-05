var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');


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

router.post('/:id', function(req, res) {
	db.nutrient.findOrCreate( {
		where: {
			ndbno: req.body.ndbno,
			foodName: req.body.foodName,
			quantity: req.body.quantity,
			carb: req.body.carb,
			fat: req.body.fat,
			protein: req.body.protein
		}	
	}).spread(function(nutrient, created) {
		nutrient.save().then(function(nutrient) {
			res.redirect('/diary');	
		})
		
	})
});

module.exports = router;