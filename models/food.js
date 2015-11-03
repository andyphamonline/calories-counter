'use strict';
module.exports = function(sequelize, DataTypes) {
  var food = sequelize.define('food', {
    foodName: DataTypes.STRING,
    brand: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.food.belongsToMany(models.user, {through: 'usersfoods'});
      }
    }
  });
  return food;
};