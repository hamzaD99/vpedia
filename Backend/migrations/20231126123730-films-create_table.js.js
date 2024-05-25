'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('films', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name_arabic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name_english: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description_arabic: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description_english: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reviewer_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      film_link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      series_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('films');
  }
};
