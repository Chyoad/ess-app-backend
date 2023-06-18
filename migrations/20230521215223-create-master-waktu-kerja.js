'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_waktu_kerjas', {
      kode_shift: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(5)
      },
      jenis_bulan: {
        type: Sequelize.STRING(3)
      },
      waktu_masuk_kerja: {
        type: Sequelize.TIME
      },
      waktu_pulang_kerja: {
        type: Sequelize.TIME
      },
      kode_lokasi_tugas: {
        type: Sequelize.STRING(5)
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_waktu_kerjas');
  }
};