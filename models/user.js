'use strict';
var bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.provider);
        models.user.belongsToMany(models.nutrient, {through: 'usersnutrients'});
        models.user.belongsToMany(models.food, {through: 'usersfoods'});
      },
      authenticate: function(email, password, callback) {
        this.find({where: {email:email}}).then(function(user) {
          if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
              if (err) {
                callback(err); 
              } else {
                callback(null, result ? user: false);
              }
            });
          } else {
            callback(null, false);
          }
        }).catch(callback);
      }
    },
    hooks: {
      beforeCreate: function(user, options, callback) {
        if (!user.password) return callback(null, user);
        bcrypt.hash(user.password, 10, function(err, hash) {
          if (err) return callback(err);
          user.password = hash;
          callback(null, user);
        });
      }
    }
  });
  return user;
};