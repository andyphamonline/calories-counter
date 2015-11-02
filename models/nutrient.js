'use strict';
module.exports = function(sequelize, DataTypes) {
  var nutrient = sequelize.define('nutrient', {
    caloriesGram: DataTypes.INTEGER,
    carbPercent: DataTypes.INTEGER,
    fatPercent: DataTypes.INTEGER,
    proteinPercent: DataTypes.INTEGER,
    carbGram: DataTypes.INTEGER,
    fatGram: DataTypes.INTEGER,
    proteinGram: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return nutrient;
};