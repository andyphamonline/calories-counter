var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var request = require('request');

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

////request works for json file with search term (i.e.sausage); but not all sausages right now
// app.get('/', function(req, res) {
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

app.use('/goal', require('./controllers/goal'));

app.use('/diary', require('./controllers/diary'));

app.use('/add', require('./controllers/add'));

server.listen(port);
