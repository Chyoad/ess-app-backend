'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_waktu_kerja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      master_waktu_kerja.hasMany(models.transaksi_kehadiran, {
        foreignKey: {
          name: 'status_shift',
          allowNull: false,
        },
        as: 'transaksi_kehadiran'
      });

    }
  }
  master_waktu_kerja.init({
    kode_shift: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    jenis_bulan: DataTypes.STRING,
    waktu_masuk_kerja: DataTypes.TIME,
    waktu_pulang_kerja: DataTypes.TIME,
    kode_lokasi_tugas: DataTypes.STRING,
    created_date: { allowNull: false, type: DataTypes.DATE },
    updated_by: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'master_waktu_kerja',
  });
  return master_waktu_kerja;
};