const { riwayat_pendidikan: Pendidikan, master_personil: Personil, temp_update_personil: Update_personil } = require('../models');

// Convert Kode Agama
const convertAgama = kode_agama => {
  let agama;
  switch (kode_agama) {
    case '1':
      agama = 'Islam';
      break;
    case '2':
      agama = 'Kristen Protestan';
      break;
    case '3':
      agama = 'Kristen Katolik';
      break;
    case '4':
      agama = 'Hindu';
      break;
    case '5':
      agama = 'Buddha';
      break;
    case '6':
      agama = 'Konghucu';
      break;
  }
  return agama;
};

// Convert Kode Jenis Kelamin
const convertJenisKelamin = kode_jenis_kelamin => {
  let jenis_kelamin;
  switch (kode_jenis_kelamin) {
    case 'L':
      jenis_kelamin = 'Laki-laki';
      break;
    case 'P':
      jenis_kelamin = 'Perempuan';
      break;
  }
  return jenis_kelamin;
};

// Convert kode status pernikahan
const convertStatusPernikahan = kode_status_pernikahan => {
  let status_pernikahan;
  switch (kode_status_pernikahan) {
    case 'TK0':
      status_pernikahan = 'Belum Menikah';
      break;
    case 'TK1':
      status_pernikahan = 'Sudah Menikah';
      break;
  }
  return status_pernikahan;
};

// Convert kode status pernikahan
const convertStatusAktif = kode_status_aktif => {
  let status_aktif;
  switch (kode_status_aktif) {
    case 1:
      status_aktif = 'Aktif';
      break;
    case 0:
      status_aktif = 'Tidak Aktif';
      break;
  }
  return status_aktif;
};



// Fungsi untuk melihat user profil
const getUserProfile = async (req, res) => {

  const { npp } = req.query

  try {
    const personil = await Personil.findByPk(npp);
    if (!personil) {
      return res.status(200).json({ succes: false, message: "personil not found" });
    }

    // Menghitung pensiun
    let tanggal_lahir = new Date(new Date(personil.tanggal_lahir).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
    tanggal_lahir.setFullYear(tanggal_lahir.getFullYear() + 58); // pensiun = tanggal lahir + 58 years
    let pensiun = new Date(new Date(tanggal_lahir).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })).getFullYear() - new Date().getFullYear();

    // Menghitung lama masa kerja
    let date_now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    let mulai_masuk_kerja = new Date(new Date(personil.mulai_masuk_kerja).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    date_now.setFullYear(date_now.getFullYear() - mulai_masuk_kerja.getFullYear())
    let lama_masa_kerja = new Date(date_now).getFullYear();
    lama_masa_kerja.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })

    // Menghitung cuti besar = tahun sekarang + (4-(tahun sekarang - mulai masuk kerja % 4))
    let cuti_besar = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })).getFullYear() + (4 - ((new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })).getFullYear() - mulai_masuk_kerja.getFullYear()) % 4))

    return res.status(200).json({
      success: true,
      message: "user profile found",
      data: {
        npp: personil.npp,
        no_ktp: personil.no_ktp,
        no_npwp: personil.no_npwp,
        nama_lengkap: personil.nama_lengkap,
        nama_panggilan: personil.nama_panggil,
        email: personil.email_lain,
        no_hp: personil.no_hp,
        tempat_lahir: personil.tempat_lahir,
        tanggal_lahir: personil.tanggal_lahir,
        agama: convertAgama(personil.agama),
        golongan_darah: personil.golongan_darah,
        jenis_kelamin: convertJenisKelamin(personil.jenis_kelamin),
        status_pernikahan: convertStatusPernikahan(personil.kode_status_pernikahan),
        cuti_besar: cuti_besar,
        pensiun: pensiun,
        lama_masa_kerja: lama_masa_kerja,
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk melihat user cv
const getCv = async (req, res) => {

  const { npp } = req.query

  try {
    const personil = await Personil.findByPk(npp);
    if (!personil) {
      return res.status(404).json({ success: false, message: "personil not found" });
    }

    const pendidikan = await Pendidikan.findAll({ where: { npp: npp } });

    return res.status(200).json({
      success: true,
      message: "cv user found",
      data: {
        nama: personil.nama_lengkap,
        unit: personil.kode_unit,
        tempat_lahir: personil.tempat_lahir,
        tanggal_lahir: personil.tanggal_lahir,
        alamat_rumah: personil.alamat,
        alamat_kantor: personil.kode_lokasi_tugas,
        jenis_kelamin: convertJenisKelamin(personil.jenis_kelamin),
        strata: personil.kode_status_pegawai,
        status: convertStatusAktif(personil.kode_status_aktif),
        riwayat_pendidikan: pendidikan
      }
    });

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk memperbarui user profile
const updateProfile = async (req, res) => {

  const { npp, nama_lengkap, nama_panggilan, agama, no_hp, email, updated_by } = req.body.data;

  try {
    const updatePersonil = await Update_personil.create({
      tanggal_update: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })),
      npp: npp,
      nama_lengkap: nama_lengkap,
      nama_panggil: nama_panggilan,
      agama: agama,
      no_hp: no_hp,
      email_lain: email,
      created_date: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })),
      updated_by: updated_by,
    })

    return res.status(200).json({ success: true, message: "successfully update user profile", data: updatePersonil });

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message });
  }
}



module.exports = {
  getUserProfile, getCv, updateProfile
}







