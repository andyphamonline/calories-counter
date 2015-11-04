'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersnutrients = sequelize.define('usersnutrients', {
    userId: DataTypes.INTEGER,
    nutrientId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersnutrients;
};