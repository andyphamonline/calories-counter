var express = require('express');
var router = express.Router();
var db = require('../models')
var goal = {};

//working render goal.ejs
router.get('/', function(req, res) {
	res.render('diary', {goal: goal});
});


// //render diary.ejs with data from table in progress
// router.get('/',function (req, res) {
// 	db.log.findAll( {
// 		include: [db.nutrient],
// 		where: {
// 			userId: req.session.user,
// 			date: req.session.currentDate
// 		}}).then(function(logs) {
// 			console.log(logs);
// 		});

// });

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
				// render response
				console.log(logs[0].nutrient);
			} else {
				console.log("No logs found!");
			}
		});
	});









// //example from class
// router.get('/', function(req, res) {
//   db.favorite.findAll({
//     order: 'title ASC'
//   }).then(function(favorites) {
//     res.render('favorites/index', {favorites: favorites});
//   });
// });

// router.get('/', function(req, res) {
//   db.tag.findAll({
//     include: [db.favorite]
//   }).then(function(tags) {
//     res.render('tags/index', {tags: tags});
//   });
// });

//working post
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