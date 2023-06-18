'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class center_location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  center_location.init({
    kode_lokasi: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    nama_lokasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'center_location',
  });
  return center_location;
};