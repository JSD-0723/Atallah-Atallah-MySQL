'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('book', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      isbn: {
        type: DataTypes.STRING(55),
        unique: true,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Customer, // Reference the Managers model
          key: 'id', // Reference the ID column in Managers
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('book');
  }
};
