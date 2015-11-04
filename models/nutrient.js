'use strict';
module.exports = function(sequelize, DataTypes) {
  var nutrient = sequelize.define('nutrient', {
    carb: DataTypes.INTEGER,
    fat: DataTypes.INTEGER,
    protein: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.nutrient.belongsToMany(models.user, {through: 'usersnutrients'});
      }
    }
  });
  return nutrient;
};