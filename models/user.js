'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    password2: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.provider);
        models.user.belongsToMany(models.nutrient, {through: 'usersnutrients'});
        models.user.belongsToMany(models.food, {through: 'usersfoods'});
      }
    }
  });
  return user;
};