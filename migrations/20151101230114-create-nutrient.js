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
      caloriesGram: {
        type: Sequelize.INTEGER
      },
      carbPercent: {
        type: Sequelize.INTEGER
      },
      fatPercent: {
        type: Sequelize.INTEGER
      },
      proteinPercent: {
        type: Sequelize.INTEGER
      },
      carbGram: {
        type: Sequelize.INTEGER
      },
      fatGram: {
        type: Sequelize.INTEGER
      },
      proteinGram: {
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