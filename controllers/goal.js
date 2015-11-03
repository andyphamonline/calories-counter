var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');




router.route('/')
.get(function(req, res) {
  console.log(req.currentUser);
  res.render('goal');
})
.post(function(req, res) {
	db.user.authenticate(req.body.email, req.body.password, function(err, user) {
    console.log("---------------");
    console.log(user);
    console.log("---------------");
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




module.exports = router;

