const { temp_jam_terbuang: Jam_terbuang } = require('../models');
const { Op } = require("sequelize");


// Mengonversi detik menjadi format hh:mm:ss
const convertToTimeFormat = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const timeFormat = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  return timeFormat;
}



// Fungsi untuk melihat jam terbuang
const getHistoryJamTerbuang = async (req, res) => {

  const { npp } = req.query

  const tanggal = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));

  const startDate = new Date(new Date(tanggal).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  startDate.setDate(1); // Set tanggal menjadi 1 untuk mendapatkan bulan dan tahun yang sama

  const endDate = new Date(new Date(tanggal).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0); // Set tanggal menjadi 0 untuk mendapatkan tanggal terakhir bulan sebelumnya

  try {
    const jamTerbuang = await Jam_terbuang.findAll({ where: { npp: npp }, order: [['tanggal', 'DESC']], limit: 5 });
    if (!jamTerbuang) {
      return res.status(404).json({ success: false, message: "jam terbuang not found" });
    }

    const numbersOfJamTerbuang = await Jam_terbuang.sum('total_jam_terbuang', { where: { [Op.and]: [{ npp: npp, tanggal: { [Op.between]: [startDate, endDate] } }] } });

    let dataJamTerbuang = jamTerbuang;

    for (let i = 0; i < jamTerbuang.length; i++) {
      if (jamTerbuang[i]?.jam_telat !== undefined) {
        dataJamTerbuang[i].jam_telat = convertToTimeFormat(jamTerbuang[i].jam_telat);
        dataJamTerbuang[i].jam_pulang_cepat = convertToTimeFormat(jamTerbuang[i].jam_pulang_cepat);
        dataJamTerbuang[i].jam_kk_tidak_kembali = convertToTimeFormat(jamTerbuang[i].jam_kk_tidak_kembali);
        dataJamTerbuang[i].jam_tidak_ada_keterangan = convertToTimeFormat(jamTerbuang[i].jam_tidak_ada_keterangan);
        dataJamTerbuang[i].total_jam_terbuang = convertToTimeFormat(jamTerbuang[i].total_jam_terbuang);
      } else {
        break;
      }
    }

    return res.status(200).json({
      success: true,
      message: "successfully to get history in jam terbuang",
      data: {
        numbers_of_Jam_terbuang: convertToTimeFormat(numbersOfJamTerbuang),
        jam_terbuang: dataJamTerbuang
      }
    });

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk melihat jam terbuang sesuai tanggal yang dipilih
const chooseDateJamTerbuang = async (req, res) => {

  const { npp, tanggal } = req.query

  const startDate = new Date(new Date(tanggal).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  startDate.setDate(1); // Set tanggal menjadi 1 untuk mendapatkan bulan dan tahun yang sama

  const endDate = new Date(new Date(tanggal).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0); // Set tanggal menjadi 0 untuk mendapatkan tanggal terakhir bulan sebelumnya

  try {
    const jamTerbuang = await Jam_terbuang.findOne({ where: { npp: npp, tanggal: tanggal } });

    const numbersOfJamTerbuang = await Jam_terbuang.sum('total_jam_terbuang', { where: { [Op.and]: [{ npp: npp, tanggal: { [Op.between]: [startDate, endDate] } }] } });

    if (!jamTerbuang) {
      return res.status(404).json({ success: false, message: "jam terbuang not found", numbers_of_Jam_terbuang: convertToTimeFormat(numbersOfJamTerbuang) });
    }


    return res.status(200).json({
      success: true,
      message: "successfully to choose date in jam terbuang",
      data: {
        numbers_of_Jam_terbuang: convertToTimeFormat(numbersOfJamTerbuang),
        jam_terbuang:
        {
          tanggal: jamTerbuang.tanggal,
          jam_telat: convertToTimeFormat(jamTerbuang.jam_telat),
          jam_pulang_cepat: convertToTimeFormat(jamTerbuang.jam_pulang_cepat),
          jam_kk_tidak_kembali: convertToTimeFormat(jamTerbuang.jam_kk_tidak_kembali),
          jam_tidak_ada_keterangan: convertToTimeFormat(jamTerbuang.jam_tidak_ada_keterangan),
          total_jam_terbuang: convertToTimeFormat(jamTerbuang.total_jam_terbuang)
        }
      }
    });

  } catch (err) {
    onsole.error(err)
    res.status(500).json({ success: false, message: err.message });
  }
}


module.exports = {
  getHistoryJamTerbuang, chooseDateJamTerbuang
}
