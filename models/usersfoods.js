'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersfoods = sequelize.define('usersfoods', {
    userId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersfoods;
};