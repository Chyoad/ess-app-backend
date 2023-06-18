const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { tabel_user: User, master_personil: Personil } = require('../models');
const { Op } = require("sequelize");
const { generateOTP, expirationOTP } = require('../services/otp');
const { sendOTPByEmail } = require('../services/email');



// Fungsi untuk login
const login = async (req, res) => {

  const { npp, password } = req.body

  try {
    const user = await User.findOne({ where: { npp: npp } });
    if (!user) {
      return res.status(401).json({ success: false, message: "user not found" });
    }

    // Memeriksa apakah password benar
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ success: false, message: "invalid password" });
    }

    // Membuat token dengan waktu kedaluwarsa 1 hari (86400 detik)
    const token = jwt.sign({ npp: user.npp }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });

    if (user && passwordIsValid) {
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
          user: {
            npp: user.npp,
            group_akses: user.group_akses,
            created_date: user.created_date,
            created_by: user.created_by,
            active: user.active
          },
          token: token,
        }

      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk forget password
const forgetPassword = async (req, res) => {

  const { npp, no_ktp } = req.body;
  const otpGenerated = generateOTP();
  const otpExpiration = expirationOTP();

  try {
    const personil = await Personil.findOne({
      where: { [Op.and]: [{ npp, no_ktp }] },
      include: { model: User, as: 'tabel_user' }
    });

    if (!personil) {
      return res.status(404).json({ success: false, message: "npp or no.ktp not found" });
    }

    // Mengupdate field otp dan waktu kadaluwarsa otp di tabel_user
    const userUpdateOtp = await personil.tabel_user.update({
      otp: bcrypt.hashSync(otpGenerated, 10),
      otp_expiration: otpExpiration
    })

    // Mengirim e-mail
    const sendMail = await sendOTPByEmail(personil.email_lain, otpGenerated, personil.nama_panggil);

    if (!userUpdateOtp && !sendMail) {
      return res.status(200).json({ success: false, message: "otp not sent successfully via e-mail" })
    } else {
      return res.status(200).json({ success: true, message: "otp succesfully sent via e-mail" })
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk verifikasi otp
const verifyOtp = async (req, res) => {

  const { npp, otp } = req.body;

  try {
    const user = await User.findOne({ where: { npp: npp } });
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    // Memeriksa apakah kode otp benar
    const otpIsValid = bcrypt.compareSync(otp, user.otp)
    if (!otpIsValid) {
      return res.status(401).json({ success: false, message: "invalid otp" });
    }

    // Memeriksa apakah kode otp belum kadaluwarsa
    const otpIsNotExpired = user.otp_expiration > new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    if (!otpIsNotExpired) {
      return res.status(400).json({ success: false, message: "otp has expired" });
    }

    // Membuat token dengan waktu kedaluwarsa 1 hari (86400 detik)
    const token = jwt.sign({ npp: user.npp }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });

    if (user && otpIsValid && otpIsNotExpired) {
      return res.status(200).json({
        success: true,
        message: "successfully verify otp",
        "token": token
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk memperbarui password
const updatePassword = async (req, res) => {

  const { npp, new_password } = req.body;

  // Validasi panjang password harus 8 karakter
  if (new_password.length !== 8) {
    return res.status(400).json({ success: false, message: "new password must be 8 characters long" });
  }

  try {
    const user = await User.findOne({ where: { npp: npp } });
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    // Mengecek apakah password baru sama dengan password lama
    const isSamePassword = bcrypt.compareSync(new_password, user.password);

    if (!isSamePassword) { // Jika password baru tidak sama dengan password lama
      await user.update({ password: bcrypt.hashSync(new_password, 10), otp: null }); // Memperbarui password dan menghapus otp
      return res.status(200).json({ success: true, message: "password updated and OTP deleted" });
    } else { // Jika password baru sama dengan password lama
      await user.update({ otp: null }); // Menghapus otp
      return res.status(200).json({ success: true, message: "password is the same, not updated but OTP deleted" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}



// Fungsi untuk merubah password dengan memasukkan password lama
const changePassword = async (req, res) => {

  const { npp, password } = req.body

  try {
    const user = await User.findOne({ where: { npp: npp } });
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    // Memeriksa apakah password benar
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ success: false, message: "invalid password" });
    }

    if (user && passwordIsValid) {
      return res.status(200).json({ success: true, message: "password is valid" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }

}


module.exports = {
  login, changePassword, forgetPassword, verifyOtp, updatePassword
}
