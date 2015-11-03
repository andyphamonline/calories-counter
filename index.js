var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var request = require('request');
var session = require('express-session');
var db = require('./models');
var flash = require('connect-flash');

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');

app.route('/')
	.get(function(req, res) {
		res.render('index');
	})
	.post(function(req, res) {
		if (req.body.password != req.body.password2) {
			req.flash('danger', 'Passwords do not match');
			res.redirect('/');
		} 
		else {
			console.log(req.body.email+req.body.firstName+req.body.lastName)
			db.user.findOrCreate({
				where: {email: req.body.email},
				defaults: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					username: req.body.username,
					password: req.body.password
				}
			}).spread(function(user, created) {				
		        if (created) {
		          req.session.user = user.id;
		          req.flash('success', 'You are signed up and logged in.')
		          res.redirect('/');
		        } else {
		        	req.flash('danger', 'A user with that e-mail address already exists.');		          		          
		        	res.redirect('/');
		        }
		    }).catch(function(err) {
        			req.flash('danger','Error');
        			res.redirect('/');
     		});
		}
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
