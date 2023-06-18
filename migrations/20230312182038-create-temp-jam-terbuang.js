'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('temp_jam_terbuangs', {
      tanggal: {
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
      jam_telat: {
        type: Sequelize.FLOAT
      },
      jam_pulang_cepat: {
        type: Sequelize.FLOAT
      },
      jam_kk_tidak_kembali: {
        type: Sequelize.FLOAT
      },
      jam_tidak_ada_keterangan: {
        type: Sequelize.FLOAT
      },
      total_jam_terbuang: {
        type: Sequelize.FLOAT
      },
      uang_jaga: {
        type: Sequelize.INTEGER
      },
      uang_makan: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('temp_jam_terbuangs');
  }
};