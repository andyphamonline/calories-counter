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

app.use(flash());
app.use(session({
  secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');



app.route('/')
	.get(function(req, res) {
		res.render('index');
	})
	.post(function(req, res) {
		if (req.body.password !== req.body.password2) {
			console.og('password');
			req.flash('danger', 'Passwords do not match');
			res.render('index', {alerts: req.flash()});
		} 
		else {
			console.log('findOrCreate');
			db.user.findOrCreate({
				where: {email: req.body.email},
				defaults: {				
					name: req.body.name,			
					password: req.body.password					
				}

			}).spread(function(user, created) {		
		        if (created) {	
		        	console.log('if');
	        		req.session.user = user.id;
	        		req.flash('success', 'You are signed up and logged in.');
	        		res.render('goal', {alert: req.flash()});
		        } else {		  
		        	console.log('else');      	
		        	req.flash('danger','A user with that e-mail address already exists.');
               		res.render('index', {alerts: req.flash()});		        	
		        }
		    })		    
		    .catch(function(err) {
		    		console.log(err)
        			req.flash('danger','Error');
        			res.render('index', {alert: req.flash()});        			
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
