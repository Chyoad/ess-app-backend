'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('master_personils', {
      npp: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(9)
      },
      nama_lengkap: {
        type: Sequelize.STRING(50)
      },
      nama_panggil: {
        type: Sequelize.STRING(10)
      },
      tempat_lahir: {
        type: Sequelize.STRING(25)
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY
      },
      kode_unit: {
        type: Sequelize.INTEGER
      },
      kode_jabatan: {
        type: Sequelize.INTEGER
      },
      kode_eselon: {
        type: Sequelize.STRING(5)
      },
      kode_jenis_jabatan: {
        type: Sequelize.STRING(5)
      },
      kode_status_pegawai: {
        type: Sequelize.INTEGER
      },
      kode_status_aktif: {
        type: Sequelize.INTEGER
      },
      kode_lokasi_tugas: {
        type: Sequelize.STRING(5)
      },
      jenis_kelamin: {
        type: Sequelize.STRING(5)
      },
      golongan_darah: {
        type: Sequelize.STRING(2)
      },
      agama: {
        type: Sequelize.STRING(20)
      },
      alamat: {
        type: Sequelize.STRING
      },
      kode_status_pernikahan: {
        type: Sequelize.STRING(6)
      },
      kode_pendidikan: {
        type: Sequelize.INTEGER
      },
      no_hp: {
        type: Sequelize.STRING(100)
      },
      no_npwp: {
        type: Sequelize.STRING(20)
      },
      no_ktp: {
        type: Sequelize.STRING(50)
      },
      email_lain: {
        type: Sequelize.STRING(50)
      },
      mulai_pegawai_tetap: {
        type: Sequelize.DATEONLY
      },
      mulai_masuk_kerja: {
        type: Sequelize.DATEONLY
      },
      poin: {
        type: Sequelize.INTEGER
      },
      foto: {
        type: Sequelize.STRING
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.STRING(100)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('master_personils');
  }
};