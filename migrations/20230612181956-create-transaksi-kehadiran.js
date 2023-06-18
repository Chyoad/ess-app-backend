'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transaksi_kehadirans', {
      tanggal_hadir: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATEONLY
      },
      npp: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(9),
        references: {
          model: 'master_personils',
          key: 'npp',
          as: 'npp',
        }
      },
      nama_hari: {
        type: Sequelize.STRING(50)
      },
      status_hari_kerja: {
        type: Sequelize.STRING(1)
      },

      status_shift: {
        type: Sequelize.STRING(50),
        references: {
          model: 'master_waktu_kerjas',
          key: 'kode_shift',
          as: 'kode_shift',
        }
      },
      t01: {
        type: Sequelize.TIME
      },
      t02: {
        type: Sequelize.TIME
      },
      t03: {
        type: Sequelize.TIME
      },
      t04: {
        type: Sequelize.TIME
      },
      t05: {
        type: Sequelize.TIME
      },
      t06: {
        type: Sequelize.TIME
      },
      t07: {
        type: Sequelize.TIME
      },
      t08: {
        type: Sequelize.TIME
      },
      t09: {
        type: Sequelize.TIME
      },
      t10: {
        type: Sequelize.TIME
      },
      status_absen: {
        type: Sequelize.STRING(50)
      },
      status_cuti: {
        type: Sequelize.STRING(50)
      },
      status_keluar_komp: {
        type: Sequelize.STRING(200)
      },
      status_lembur: {
        type: Sequelize.STRING(50)
      },
      kode_unit: {
        type: Sequelize.INTEGER
      },
      status_absen_khusus: {
        type: Sequelize.STRING(50)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transaksi_kehadirans');
  }
};