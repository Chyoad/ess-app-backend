'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
        nama_lengkap: `ARIF,DR.,IR. (${i})`,
        nama_panggil: 'ARIF',
        tempat_lahir: 'JAKARTA',
        tanggal_lahir: '1996-02-15',
        kode_unit: '823',
        kode_jabatan: '6744',
        kode_eselon: '1',
        kode_jenis_jabatan: 'S',
        kode_status_pegawai: '1',
        kode_status_aktif: '1',
        kode_lokasi_tugas: 'B',
        jenis_kelamin: 'L',
        golongan_darah: 'O',
        agama: '1',
        alamat: 'JAKARTA',
        kode_status_pernikahan: 'TK0',
        kode_pendidikan: '9',
        no_hp: '08111111111',
        no_npwp: '123.456.789.123',
        no_ktp: '123456789101112',
        email_lain: 'mirmg123@gmail.com',
        mulai_pegawai_tetap: '2015-01-01',
        mulai_masuk_kerja: '2015-02-02',
        poin: '100',
        foto: 'user',
        created_date: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })),
        updated_by: 'ADMIN'
      })
    }
    return queryInterface.bulkInsert('master_personils', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('master_personils', null, {});
  }
};
