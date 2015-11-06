'use strict';
module.exports = function(sequelize, DataTypes) {
  var log = sequelize.define('log', {
    userId: DataTypes.INTEGER,
    nutrientId: DataTypes.INTEGER,
    date: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.log.belongsTo(models.user);
        models.log.hasOne(models.nutrient);
      }
    }
  });
  return log;
};