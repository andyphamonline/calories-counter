'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('nutrients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foodName: {
        type: Sequelize.TEXT
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      carb: {
        type: Sequelize.INTEGER
      },
      fat: {
        type: Sequelize.INTEGER
      },
      protein: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('nutrients');
  }
};