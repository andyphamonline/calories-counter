var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

router.route('/')
.get(function(req, res) {
  db.user.findById(req.session.user).then(function(user) {
    res.render('goal', {user: user});
  })
})
.post(function(req, res) {
	db.user.authenticate(req.body.email, req.body.password, function(err, user) {  
    if (err) {
      res.send(err);
    } else if (user) {
      req.session.user = user.id;
      req.flash('success', 'You are logged in');
      res.redirect('/goal');
    } else {
      req.flash('danger', 'Invalid email or password');
      res.redirect('/');
    }
  });
});

router.post('/changeGoal', function(req, res) {
  db.user.find( {where: {id: req.session.user} }).then(function(user) {
    user.calories = req.body.calories;
    user.carbPercent = req.body.carbPercent;
    user.fatPercent = req.body.fatPercent;
    user.proteinPercent = req.body.proteinPercent;
    user.save().then(function(user) {
      res.redirect('/goal');
    });
  })
});

module.exports = router;

