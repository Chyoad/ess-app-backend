'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('riwayat_pendidikans', {
      kode_riwayat_pendidikan: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      npp: {
        type: Sequelize.STRING(9),
        references: {
          model: 'master_personils',
          key: 'npp',
          as: 'npp',
        }
      },
      tingkat_pendidikan: {
        type: Sequelize.STRING(100)
      },
      jurusan_pendidikan: {
        type: Sequelize.STRING(100)
      },
      lembaga_pendidikan: {
        type: Sequelize.STRING(200)
      },
      kota_lembaga_pendidikan: {
        type: Sequelize.STRING(100)
      },
      no_ijazah: {
        type: Sequelize.STRING
      },
      tanggal_ijazah: {
        type: Sequelize.DATEONLY
      },
      tahun_lulus: {
        type: Sequelize.STRING(4)
      },
      created_date: {
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.STRING
      },
      modified_date: {
        type: Sequelize.DATE
      },
      modified_by: {
        type: Sequelize.STRING
      },
      kelompok_pendidikan: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('riwayat_pendidikans');
  }
};