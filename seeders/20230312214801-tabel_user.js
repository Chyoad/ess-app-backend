'use strict';

const bcrypt = require("bcryptjs");

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

    let data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        npp: `80123${i}`,
        password: bcrypt.hashSync('12345678', 8),
        group_akses: '18',
        created_date: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })),
        created_by: 'Admin',
        active: '1'
      })
    }
    return queryInterface.bulkInsert('tabel_users', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('tabel_users', null, {});
  }
};
