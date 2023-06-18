'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_personil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      master_personil.hasOne(models.tabel_user, {
        foreignKey: {
          name: 'npp',
          allowNull: false,
        },
        as: 'tabel_user',
      });

      master_personil.hasOne(models.riwayat_pendidikan, {
        foreignKey: {
          name: 'npp',
          allowNull: false,
        },
        as: 'riwayat_pendidikan',
      });

      master_personil.hasMany(models.transaksi_kehadiran, {
        foreignKey: {
          name: 'npp',
          allowNull: false,
        },
        as: 'transaksi_kehadiran'
      });

      master_personil.hasMany(models.temp_jam_terbuang, {
        foreignKey: {
          name: 'npp',
          allowNull: false,
        },
        as: 'temp_jam_terbuang'
      });

      master_personil.hasMany(models.temp_update_personil, {
        foreignKey: {
          name: 'npp',
          allowNull: false,
        },
        as: 'temp_update_personil'
      });

    }
  };
  master_personil.init({
    npp: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    nama_lengkap: DataTypes.STRING,
    nama_panggil: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    kode_unit: DataTypes.INTEGER,
    kode_jabatan: DataTypes.INTEGER,
    kode_eselon: DataTypes.STRING,
    kode_jenis_jabatan: DataTypes.STRING,
    kode_status_pegawai: DataTypes.INTEGER,
    kode_status_aktif: DataTypes.INTEGER,
    kode_lokasi_tugas: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    golongan_darah: DataTypes.STRING,
    agama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    kode_status_pernikahan: DataTypes.STRING,
    kode_pendidikan: DataTypes.INTEGER,
    no_hp: DataTypes.STRING,
    no_npwp: DataTypes.STRING,
    no_ktp: DataTypes.STRING,
    email_lain: DataTypes.STRING,
    mulai_pegawai_tetap: DataTypes.DATEONLY,
    mulai_masuk_kerja: DataTypes.DATEONLY,
    poin: DataTypes.INTEGER,
    created_date: { allowNull: false, type: DataTypes.DATE },
    updated_by: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'master_personil',
  });
  return master_personil;
};