"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Record.init(
    {
      periode: DataTypes.STRING,
      sandiBank: DataTypes.FLOAT,
      kreditKol1: DataTypes.FLOAT,
      kreditKol2: DataTypes.FLOAT,
      kreditKol3: DataTypes.FLOAT,
      kreditKol4: DataTypes.FLOAT,
      kreditKol5: DataTypes.FLOAT,
      laba: DataTypes.FLOAT,
      modal: DataTypes.FLOAT,
      totalAset: DataTypes.FLOAT,
      atmr: DataTypes.FLOAT,
      bo: DataTypes.FLOAT,
      po: DataTypes.FLOAT,
      dpk: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Record",
    }
  );
  return Record;
};
