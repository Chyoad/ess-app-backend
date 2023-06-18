'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class temp_update_personil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      temp_update_personil.belongsTo(models.master_personil, {
        foreignKey: 'npp',
        as: 'master_personil'
      });
    }
  };
  temp_update_personil.init({
    tanggal_update: { type: DataTypes.DATE, primaryKey: true, allowNull: false },
    npp: DataTypes.STRING,
    nama_lengkap: DataTypes.STRING,
    nama_panggil: DataTypes.STRING,
    agama: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    email_lain: DataTypes.STRING,
    created_date: { allowNull: false, type: DataTypes.DATE },
    updated_by: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'temp_update_personil',
  });
  return temp_update_personil;
};