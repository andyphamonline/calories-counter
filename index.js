var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
// var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var session = require('express-session');
var db = require('./models');
var flash = require('connect-flash');

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/static'));

app.use(session({
  secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next) {
	//take it out when deploy, this line to hardwire session.user to userId = 1
	req.session.user = 1;
	//
	
  if (req.session.user) {
    db.user.findById(req.session.user).then(function(user) {
      req.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    next();
  }
});

app.use(function (req, res, next) {
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash();
	next();
});

app.set('view engine', 'ejs');

app.route('/')
	.get(function(req, res) {
		res.render('index');
	})
	.post(function(req, res) {
		if (req.body.password !== req.body.password2) {
			req.flash('danger', 'Passwords do not match');
			res.render('index');
		} 
		else {
			db.user.findOrCreate({
				where: {email: req.body.email},
				defaults: {				
					name: req.body.name,			
					password: req.body.password,
					calories: 1500,
					carbPercent: 5,
					fatPercent: 75,
					proteinPercent: 20
				}
			}).spread(function(user, created) {
		        if (created) {			        
	        		req.session.user = user.id;
	        		req.flash('success', 'You are signed up and logged in.');
	        		res.redirect('/goal');
		        } else {		  		          	
		        	req.flash('danger','A user with that e-mail address already exists.');
               		res.render('index', {alerts: req.flash()});		        	
		        }
		    })		    
		    .catch(function(err) {		    	
        			req.flash('danger','Error');
        			res.render('index', {alert: req.flash()});        			
     		});
		}
	});

app.get('/logout', function(req, res) {
  req.flash('info', 'You have been logged out');
  req.session.user = false;
  res.redirect('/');
});

app.use('/goal', require('./controllers/goal'));

app.use('/calendar', require('./controllers/calendar'));

app.use('/log', require('./controllers/log'));

app.use('/search', require('./controllers/search'));

app.use('/show', require('./controllers/show'));

app.use('/quantity', require('./controllers/quantity'));


app.listen(port);
