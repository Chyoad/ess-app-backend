'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const seedData = [];
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-05-31');
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const yy = date.getFullYear();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();
      seedData.push({
        tanggal: `${yy}-${mm}-${dd}`,
        npp: '801236',
        jam_telat: 0,
        jam_pulang_cepat: 0,
        jam_kk_tidak_kembali: 0,
        jam_tidak_ada_keterangan: 0,
        total_jam_terbuang: 0,
        uang_jaga: 0,
        uang_makan: 0
      })
    }
    return queryInterface.bulkInsert('temp_jam_terbuangs', seedData, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('temp_jam_terbuangs', null, {});
  }
};
