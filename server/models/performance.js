'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Performance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Performance.init({
    periode: DataTypes.STRING,
    NPL: DataTypes.FLOAT,
    ROE: DataTypes.FLOAT,
    ROA: DataTypes.FLOAT,
    LDR: DataTypes.FLOAT,
    BOPO: DataTypes.FLOAT,
    CAR: DataTypes.FLOAT,
    Kr: DataTypes.STRING,
    Pr: DataTypes.STRING,
    Lk: DataTypes.STRING,
    Ef: DataTypes.STRING,
    Re: DataTypes.STRING,
    Komposit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Performance',
  });
  return Performance;
};