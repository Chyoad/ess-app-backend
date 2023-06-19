const { transaksi_kehadiran: Attendance, temp_jam_terbuang: Jam_terbuang, master_waktu_kerja: Waktu_kerja, master_personil: Personil, } = require('../models');
const { Op } = require("sequelize");


// Mengkonversi tanggal dan waktu sesuai yang dibutuhkan
let dateNow = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
setInterval(function () { dateNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })) }, 1000)
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

// Menghitung selisih waktu dalam detik
const calculateTimeDifference = (time) => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })).getTime();
  const timeDifference = Math.floor((now - time) / 1000);
  return timeDifference;
}

// Mengonversi format hh:mm:ss menjadi nilai getTime()
const convertToTimeValue = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  date.setHours(hours, minutes, seconds, 0);
  const timeValue = date.getTime();
  return timeValue;
}

// Mengonversi detik menjadi format hh:mm:ss
const convertToTimeFormat = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const timeFormat = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  return timeFormat;
}



// Fungsi untuk clock-in
const clockIn = async (req, res) => {

  const { npp } = req.body;
  const getTimeConvert = (dateNow.getHours() <= 9 ? '0' : '') + dateNow.getHours() + ':' + (dateNow.getMinutes() <= 9 ? '0' : '') + dateNow.getMinutes() + ':' + (dateNow.getSeconds() <= 9 ? '0' : '') + dateNow.getSeconds();

  try {

    const personil = await Personil.findOne({ where: { npp: npp } });

    const attendance = await Attendance.create({
      tanggal_hadir: dateNow,
      npp: npp,
      nama_hari: convertDay(dateNow.getDay()),
      status_shift: 'SH00',
      kode_unit: personil.kode_unit,
      t01: getTimeConvert
    })

    const waktuKerja = await Waktu_kerja.findOne({ where: { kode_shift: attendance.status_shift } });

    const userTime = waktuKerja.waktu_masuk_kerja;
    const timeValue = convertToTimeValue(userTime);
    const timeDifference = calculateTimeDifference(timeValue);

    const jamTelat = timeDifference;
    const jamPulangCepat = 0;
    const jamKkTidakKembali = 0;
    const jamTidakAdaKeterangan = 0;

    if (jamTelat < 0) {
      const jam_terbuang = await Jam_terbuang.create({
        tanggal: attendance.tanggal_hadir,
        npp: attendance.npp,
        jam_telat: 0,
        jam_pulang_cepat: jamPulangCepat,
        jam_kk_tidak_kembali: jamKkTidakKembali,
        jam_tidak_ada_keterangan: jamTidakAdaKeterangan,
        total_jam_terbuang: 0
      })

      return res.status(200).json({ success: true, message: "successfully clock-in", data: { attendance: attendance, jam_telat: convertToTimeFormat(jam_terbuang.jam_telat) } });
    }
    else if (jamTelat >= 0) {
      const jam_terbuang = await Jam_terbuang.create({
        tanggal: attendance.tanggal_hadir,
        npp: attendance.npp,
        jam_telat: jamTelat,
        jam_pulang_cepat: jamPulangCepat,
        jam_kk_tidak_kembali: jamKkTidakKembali,
        jam_tidak_ada_keterangan: jamTidakAdaKeterangan,
        total_jam_terbuang: jamTelat + jamPulangCepat + jamKkTidakKembali + jamTidakAdaKeterangan
      })

      return res.status(200).json({ success: true, message: "successfully clock-in", data: { attendance: attendance, jam_telat: convertToTimeFormat(jam_terbuang.jam_telat) } });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk re-clock-in
const reClockIn = async (req, res) => {

  const { npp } = req.body
  const getTimeConvert = (dateNow.getHours() <= 9 ? '0' : '') + dateNow.getHours() + ':' + (dateNow.getMinutes() <= 9 ? '0' : '') + dateNow.getMinutes() + ':' + (dateNow.getSeconds() <= 9 ? '0' : '') + dateNow.getSeconds();

  try {
    const attendance = await Attendance.findOne({ where: { npp: npp, tanggal_hadir: dateNow } });
    if (!attendance) {
      return res.status(200).json({ success: false, message: "attendance not found" });
    }

    if (attendance.t02 !== null && attendance.t03 === null) {
      await attendance.update({ t03: getTimeConvert });
    } else if (attendance.t04 !== null && attendance.t05 === null) {
      await attendance.update({ t05: getTimeConvert });
    } else if (attendance.t06 !== null && attendance.t07 === null) {
      await attendance.update({ t07: getTimeConvert });
    } else if (attendance.t08 !== null && attendance.t09 === null) {
      await attendance.update({ t09: getTimeConvert });
    } else {
      return res.status(400).json({ success: false, message: "clock-in times have been recorded" });
    }

    return res.status(200).json({ success: true, message: "successfully re-clock-in", data: attendance });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk clock-out
const clockOut = async (req, res) => {

  const { npp } = req.body;
  const getTimeConvert = (dateNow.getHours() <= 9 ? '0' : '') + dateNow.getHours() + ':' + (dateNow.getMinutes() <= 9 ? '0' : '') + dateNow.getMinutes() + ':' + (dateNow.getSeconds() <= 9 ? '0' : '') + dateNow.getSeconds();

  try {
    const attendance = await Attendance.findOne({ where: { npp: npp, tanggal_hadir: dateNow } });

    if (!attendance) {
      return res.status(404).json({ success: false, message: "attendance not found" });
    }

    if (attendance.t02 === null) {
      await attendance.update({ t02: getTimeConvert });
    } else if (attendance.t03 !== null && attendance.t04 === null) {
      await attendance.update({ t04: getTimeConvert });
    } else if (attendance.t05 !== null && attendance.t06 === null) {
      await attendance.update({ t06: getTimeConvert });
    } else if (attendance.t07 !== null && attendance.t08 === null) {
      await attendance.update({ t08: getTimeConvert });
    } else if (attendance.t09 !== null && attendance.t10 === null) {
      await attendance.update({ t10: getTimeConvert });
    } else {
      return res.status(400).json({ success: false, message: "clock-out times have been recorded" });
    }

    return res.status(200).json({ success: true, message: "successfully clock-out", data: attendance });

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk mengecek status attendance
const getAttendance = async (req, res) => {

  const { npp } = req.query;

  try {
    const attendance = await Attendance.findOne({ where: { npp: npp, tanggal_hadir: dateNow } })
    if (!attendance) {
      res.status(404).json({ success: false, message: "attendance not found" })
    } else if (attendance.t01 && !attendance.t02 || attendance.t03 && !attendance.t04 || attendance.t05 && !attendance.t06 || attendance.t07 && !attendance.t08 || attendance.t09 && !attendance.t10) {
      res.status(200).json({ success: true, message: "already clock-in" })
    } else if (attendance.t02 || attendance.t04 || attendance.t06 || attendance.t08 || attendance.t10) {
      res.status(200).json({ success: true, message: "already clock-out" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk melihat history attendance 
const getHistoryAttendance = async (req, res) => {

  const { npp } = req.query;
  const tanggalHadir = dateNow;

  const startDate = new Date(new Date(tanggalHadir).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  startDate.setDate(1); // Set tanggal menjadi 1 untuk mendapatkan bulan dan tahun yang sama

  const endDate = new Date(new Date(tanggalHadir).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0); // Set tanggal menjadi 0 untuk mendapatkan tanggal terakhir bulan sebelumnya


  try {
    const attendance = await Attendance.findAll({ where: { npp: npp }, order: [['tanggal_hadir', 'DESC']], limit: 5 });
    if (!attendance) {
      return res.status(404).json({ success: false, message: "attendance not found" });
    }

    const numbersOfAttendance = await Attendance.count({ where: { [Op.and]: [{ npp: npp, tanggal_hadir: { [Op.between]: [startDate, endDate] } }] } });

    const jamTerbuang = await Jam_terbuang.findAll({ where: { npp: npp }, order: [['tanggal', 'DESC']], limit: 5 });

    const jamTelat = [];
    for (let i = 0; i < jamTerbuang.length; i++) {
      if (jamTerbuang[i]?.jam_telat === undefined) {
        break;
      }
      jamTelat[i] = convertToTimeFormat(jamTerbuang[i].jam_telat);
    }

    return res.status(200).json({
      success: true,
      message: "successfully to get history in attendance",
      numbers_of_attendance: numbersOfAttendance,
      attendance: attendance,
      jam_telat: jamTelat
    });

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message });
  }

}



// Fungsi untuk melihat history attendance sesuai tanggal yang dipilih
const chooseDateAttendance = async (req, res) => {

  const { npp, tanggal_hadir } = req.query;

  const startDate = new Date(new Date(tanggal_hadir).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  startDate.setDate(1); // Set tanggal menjadi 1 untuk mendapatkan bulan dan tahun yang sama

  const endDate = new Date(new Date(tanggal_hadir).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0); // Set tanggal menjadi 0 untuk mendapatkan tanggal terakhir bulan sebelumnya

  try {
    const attendance = await Attendance.findOne({ where: { npp: npp, tanggal_hadir: tanggal_hadir } });

    const numbersOfAttendance = await Attendance.count({ where: { [Op.and]: [{ npp: npp, tanggal_hadir: { [Op.between]: [startDate, endDate] } }] } });

    if (!attendance) {
      return res.status(404).json({ success: false, message: "attendance not found", numbers_of_attendance: numbersOfAttendance });
    }

    const jamTerbuang = await Jam_terbuang.findOne({ where: { npp: npp, tanggal: tanggal_hadir } });

    return res.status(200).json({
      success: true,
      message: "Successfully to choose date in attendance",
      numbers_of_attendance: numbersOfAttendance,
      attendance: attendance,
      jam_telat: convertToTimeFormat(jamTerbuang.jam_telat)
    });

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message });
  }
}



module.exports = {
  clockIn, clockOut, getHistoryAttendance, getAttendance, reClockIn, chooseDateAttendance
}

