var express = require('express');
var router = express.Router();
var db = require('../models')
var goal = {};

//working render goal.ejs
router.get('/', function(req, res) {
	res.render('diary', {goal: goal});
});

// diary of date page
router.get('/:date', function(req, res) {
	console.log("user: "+req.session.user+", date: "+req.params.date);
	db.log.findAll( {
		include: [db.nutrient],
		where: {
			userId: req.session.user,
			date: req.params.date
		}}).then(function(logs) {
			if (logs.length) {
				res.render('log', {logs: logs});
			} else {
				alert('No log for this date');
			}
		});
	});

// // working post
// router.post('/', function(req, res) {

// 	goal = {
// 		calories: req.body.calories,
// 		carb: req.body.carb,
// 		fat: req.body.fat,
// 		protein: req.body.protein
// 	}
// 	res.redirect('/diary');
// });


//posting to database working
router.post('/', function(req, res) {

	goal = {
		calories: req.body.calories,
		carb: req.body.carb,
		fat: req.body.fat,
		protein: req.body.protein
	}

	db.user.find( {where: {id : req.session.user} }).then(function(user) {
			user.updateAttributes( {
				carbGram: req.body.carb,
				fatGram: req.body.fat,
				proteinGram: req.body.protein	
				
			}).then(function() {
				res.redirect('/diary')
			})		
		})
});

module.exports = router;