//$(".foodResult").on("click", "a", function(e) { e.preventDefault(); window.location = window.location.toString().split("?")[0] + "?ndbno="+$(this).data("ndbno"); });

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('search');
});

router.post('/', function(req, res) {
	req.session.currentDate = req.body.date;
	console.log(req.session.currentDate);
	res.render('search');
});



module.exports = router;