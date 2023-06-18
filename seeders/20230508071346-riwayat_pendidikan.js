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
    for (let i = 0; i <= 9; i++) {
      data.push({
        kode_riwayat_pendidikan: `1234${i}`,
        npp: `80123${i}`,
        tingkat_pendidikan: 'SLTA',
        jurusan_pendidikan: 'SMA-IPA',
        lembaga_pendidikan: 'SMA 1 SURAKARTA',
        kota_lembaga_pendidikan: 'SURAKARTA',
        no_ijazah: 'Aui29eo',
        tanggal_ijazah: '2010-03-11',
        tahun_lulus: '2010',
        created_date: new Date(),
        created_by: 'Admin',
        modified_date: new Date(),
        modified_by: 'Admin',
        kelompok_pendidikan: 'SMA-IPA',
      },
        {
          kode_riwayat_pendidikan: `2234${i}`,
          npp: `80123${i}`,
          tingkat_pendidikan: 'S1-TEKNIK INFORMATIKA',
          jurusan_pendidikan: 'TEKNIK INFORMATIKA',
          lembaga_pendidikan: 'UI',
          kota_lembaga_pendidikan: 'JAKARTA',
          no_ijazah: 'Aui29eo',
          tanggal_ijazah: '2014-03-11',
          tahun_lulus: '2014',
          created_date: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })),
          created_by: 'Admin',
          modified_date: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })),
          modified_by: 'Admin',
          kelompok_pendidikan: 'S1-TEKNIK INFORMATIKA',
        }
      )


    }


    return queryInterface.bulkInsert('riwayat_pendidikans', data, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('riwayat_pendidikans', null, {});
  }
};
