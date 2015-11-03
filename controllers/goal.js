var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');




router.post('/',function(req, res) {
	db.user.authenticate(req.body.email, req.body.password, function(err, user) {
      if (err) {
        res.send(err);
      } else if (user) {
        req.session.user = user.id;
        req.flash('success', 'You are logged in');
        res.render('goal', {alert: req.flash()});
      } else {
        req.flash('danger', 'Invalid email or password');
        res.render('goal', {alert: req.flash()});
      }
    });
});



module.exports = router;

