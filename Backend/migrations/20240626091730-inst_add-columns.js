'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('institutions','issuer',{
      type: DataTypes.STRING,
      allowNull: false
    })
    await queryInterface.addColumn('institutions','cert',{
      type: DataTypes.TEXT,
      allowNull: false
    })
    await queryInterface.addColumn('institutions','entryPoint',{
      type: DataTypes.STRING
    })
    await queryInterface.addColumn('institutions','logoutUrl',{
      type: DataTypes.STRING
    })
    await queryInterface.addColumn('institutions','callbackUrl',{
      type: DataTypes.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('institutions','issuer')
    await queryInterface.removeColumn('institutions','cert')
    await queryInterface.removeColumn('institutions','entryPoint')
    await queryInterface.removeColumn('institutions','logoutUrl')
    await queryInterface.removeColumn('institutions','callbackUrl')
  }
};
