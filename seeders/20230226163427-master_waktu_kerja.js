'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    let data = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        kode_shift: `SH0${i}`,
        jenis_bulan: 'N',
        waktu_masuk_kerja: '07:30:00',
        waktu_pulang_kerja: '16:30:00',
        kode_lokasi_tugas: 'B',
        created_date: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })),
        updated_by: 'Admin'
      })
    }
    return queryInterface.bulkInsert('master_waktu_kerjas', data, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('master_waktu_kerjas', null, {});
  }
};
