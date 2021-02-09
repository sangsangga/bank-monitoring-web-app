"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Performances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      periode: {
        type: Sequelize.STRING,
      },
      NPL: {
        type: Sequelize.FLOAT,
      },
      ROE: {
        type: Sequelize.FLOAT,
      },
      ROA: {
        type: Sequelize.FLOAT,
      },
      LDR: {
        type: Sequelize.FLOAT,
      },
      BOPO: {
        type: Sequelize.FLOAT,
      },
      CAR: {
        type: Sequelize.FLOAT,
      },
      Kr: {
        type: Sequelize.STRING,
      },
      Pr: {
        type: Sequelize.STRING,
      },
      Lk: {
        type: Sequelize.STRING,
      },
      Ef: {
        type: Sequelize.STRING,
      },
      Re: {
        type: Sequelize.STRING,
      },
      Komposit: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Performances");
  },
};
