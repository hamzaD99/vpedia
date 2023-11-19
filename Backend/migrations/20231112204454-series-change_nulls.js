'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('series','name_arabic',{
      type: DataTypes.STRING,
      allowNull: false,
    })
    await queryInterface.changeColumn('series','name_english',{
      type: DataTypes.STRING,
      allowNull: true,
    })
    await queryInterface.changeColumn('series','description_arabic',{
      type: DataTypes.STRING,
      allowNull: false,
    })
    await queryInterface.changeColumn('series','description_english',{
      type: DataTypes.STRING,
      allowNull: true,
    })
    await queryInterface.changeColumn('series','image',{
      type: DataTypes.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
