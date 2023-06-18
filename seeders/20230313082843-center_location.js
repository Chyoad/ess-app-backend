'use strict';

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
    return queryInterface.bulkInsert('center_locations', [{
      kode_lokasi: 'M',
      latitude: '-7.562357783850113',
      longitude: '110.83594417240265',
      nama_lokasi: 'kampus mesen UNS',
      createdAt: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })),
      updatedAt: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })),
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('center_locations', null, {});
  }
};
