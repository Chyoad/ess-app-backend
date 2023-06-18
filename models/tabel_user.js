'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tabel_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tabel_user.belongsTo(models.master_personil, {
        foreignKey: 'npp',
        as: 'master_personil'
      });
    }
  };
  tabel_user.init({
    npp: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    password: DataTypes.STRING,
    otp: DataTypes.STRING,
    otp_expiration: DataTypes.DATE,
    group_akses: DataTypes.INTEGER,
    created_by: DataTypes.STRING,
    created_date: { type: DataTypes.DATE, allowNull: false },
    active: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'tabel_user',
  });
  return tabel_user;
};