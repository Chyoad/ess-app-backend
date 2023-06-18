'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class riwayat_pendidikan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      riwayat_pendidikan.belongsTo(models.master_personil, {
        foreignKey: 'npp',
        as: 'master_personil'
      });
    }
  }
  riwayat_pendidikan.init({
    kode_riwayat_pendidikan: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    npp: DataTypes.STRING,
    tingkat_pendidikan: DataTypes.STRING,
    jurusan_pendidikan: DataTypes.STRING,
    lembaga_pendidikan: DataTypes.STRING,
    kota_lembaga_pendidikan: DataTypes.STRING,
    no_ijazah: DataTypes.STRING,
    tanggal_ijazah: DataTypes.DATEONLY,
    tahun_lulus: DataTypes.STRING,
    created_date: DataTypes.DATE,
    created_by: DataTypes.STRING,
    modified_date: DataTypes.DATE,
    modified_by: DataTypes.STRING,
    kelompok_pendidikan: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'riwayat_pendidikan',
  });
  return riwayat_pendidikan;
};