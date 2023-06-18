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




    const seedData = [];
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-05-31');
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {

      setInterval(function () { date = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })) }, 1000)
      const convertDay = day => {
        let hari;
        switch (day) {
          case 0:
            hari = 'Minggu';
            break;
          case 1:
            hari = 'Senin';
            break;
          case 2:
            hari = 'Selasa';
            break;
          case 3:
            hari = 'Rabu';
            break;
          case 4:
            hari = 'Kamis';
            break;
          case 5:
            hari = "Jum'at";
            break;
          case 6:
            hari = 'Sabtu';
            break;
        }
        return hari;
      };

      const yy = date.getFullYear();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();
      seedData.push({
        tanggal_hadir: `${yy}-${mm}-${dd}`,
        npp: `801236`,
        nama_hari: convertDay(date.getDay()),
        status_hari_kerja: null,
        status_shift: 'SH00',
        t01: '07:23:00',
        t02: '16:44:00',
        t03: null,
        t04: null,
        t05: null,
        t06: null,
        t07: null,
        t08: null,
        t09: null,
        t10: null,
        status_absen: null,
        status_cuti: null,
        status_keluar_komp: null,
        status_lembur: null,
        kode_unit: '823',
        status_absen_khusus: null
      })
    }
    return queryInterface.bulkInsert('transaksi_kehadirans', seedData, {})
  },


  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('transaksi_kehadirans', null, {});
  }
};
