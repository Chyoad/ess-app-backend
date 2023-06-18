'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi_kehadiran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaksi_kehadiran.belongsTo(models.master_personil, {
        foreignKey: 'npp',
        as: 'master_personil'
      });

      transaksi_kehadiran.belongsTo(models.master_waktu_kerja, {
        foreignKey: 'status_shift',
        as: 'waktu_masuk_kerja'
      });
    }
  };
  transaksi_kehadiran.init({
    tanggal_hadir: { type: DataTypes.DATEONLY, primaryKey: true, allowNull: false },
    npp: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    nama_hari: DataTypes.STRING,
    status_hari_kerja: DataTypes.STRING,
    status_shift: DataTypes.STRING,
    t01: DataTypes.TIME,
    t02: DataTypes.TIME,
    t03: DataTypes.TIME,
    t04: DataTypes.TIME,
    t05: DataTypes.TIME,
    t06: DataTypes.TIME,
    t07: DataTypes.TIME,
    t08: DataTypes.TIME,
    t09: DataTypes.TIME,
    t10: DataTypes.TIME,
    status_absen: DataTypes.STRING,
    status_cuti: DataTypes.STRING,
    status_keluar_komp: DataTypes.STRING,
    status_lembur: DataTypes.STRING,
    kode_unit: DataTypes.INTEGER,
    status_absen_khusus: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'transaksi_kehadiran',
  });
  return transaksi_kehadiran;
};