"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Records", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      periode: {
        type: Sequelize.STRING,
      },
      sandiBank: {
        type: Sequelize.INTEGER,
      },
      kreditKol1: {
        type: Sequelize.INTEGER,
      },
      kreditKol2: {
        type: Sequelize.INTEGER,
      },
      kreditKol3: {
        type: Sequelize.INTEGER,
      },
      kreditKol4: {
        type: Sequelize.INTEGER,
      },
      kreditKol5: {
        type: Sequelize.INTEGER,
      },
      laba: {
        type: Sequelize.INTEGER,
      },
      modal: {
        type: Sequelize.INTEGER,
      },
      totalAset: {
        type: Sequelize.INTEGER,
      },
      atmr: {
        type: Sequelize.INTEGER,
      },
      bo: {
        type: Sequelize.INTEGER,
      },
      po: {
        type: Sequelize.INTEGER,
      },
      dpk: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Records");
  },
};
