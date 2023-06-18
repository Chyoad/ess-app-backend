'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class temp_jam_terbuang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      temp_jam_terbuang.belongsTo(models.master_personil, {
        foreignKey: 'npp',
        as: 'master_personil'
      });
    }
  };
  temp_jam_terbuang.init({
    tanggal: { type: DataTypes.DATEONLY, primaryKey: true, allowNull: false },
    npp: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    jam_telat: DataTypes.FLOAT,
    jam_pulang_cepat: DataTypes.FLOAT,
    jam_kk_tidak_kembali: DataTypes.FLOAT,
    jam_tidak_ada_keterangan: DataTypes.FLOAT,
    total_jam_terbuang: DataTypes.FLOAT,
    uang_jaga: DataTypes.INTEGER,
    uang_makan: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'temp_jam_terbuang',
  });
  return temp_jam_terbuang;
};