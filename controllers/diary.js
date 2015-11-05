var express = require('express');
var router = express.Router();
var db = require('../models')
var goal = {};

router.get('/', function(req, res) {
	res.render('diary', {goal: goal});

});

router.post('/', function(req, res) {

	goal = {
		calories: req.body.calories,
		carb: req.body.carb,
		fat: req.body.fat,
		protein: req.body.protein
	}
	res.redirect('/diary');
});






module.exports = router;