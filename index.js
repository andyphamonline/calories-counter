var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;
var request = require('request');

// app.get('/', function(req, res) {
// 	res.send('hello');
// });

app.get('/', function(req, res) {
	request(
		'http://api.nal.usda.gov/ndb/search/?format=json&q=sausage&sort=n&max=25&offset=0&api_key=' + process.env.USDA_KEY,
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.send(data);
			}
		}
	)
});


server.listen(port);
