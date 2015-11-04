var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var goal = {
		calories : req.query.calories,
		carb: req.query.carb,
		fat: req.query.fat,
		protein: req.query.protein
	}
	res.render('diary', {goal: goal});
});






module.exports = router;