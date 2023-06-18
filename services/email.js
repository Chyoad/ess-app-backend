const nodemailer = require('nodemailer');

// Konfigurasi transporter untuk mengirim email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true untuk 465, false untuk ports lainnya
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
});

// Fungsi untuk mengirim OTP melalui email
const sendOTPByEmail = (email, otp, nama_panggil, res) => {
  const mailOptions = {
    from: '"PT-PINDAD" <pindad@gmail.com>', // Alamat email pengirim
    to: email, // Alamat email penerima
    subject: ' [ESS App] Forget Password OTP Code',
    html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style type="text/css">
                  p{
                    font-size:12px;
                  }
                  .otp_wrapper{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .otp{
                    font-size:32px;
                  }
                </style>
              </head>
              <body>
              <p>Hello ${nama_panggil},</p><br>
                  <p>We wanted to let you know your OTP Code for change password here,</p><br>
                  <p>OTP Code:</p>
                  <div class="otp_wrapper">
                    <p class="otp">${otp}</p><br>
                  </div>
                  <p>You can input the code correctly, then change your password.</p><br>
                  <p>Please do not reply to this email because we just sent this message to let you know about the forget password OTP Code.</p><br>
                  <p>Thank you.</p>
              </body>
            </html>
            `
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      console.log('e-mail successfully sent')
      return true
    })
    .catch((error) => {
      console.error('e-mail not sent successfully, error:', error);
      return false;
    });

}

module.exports = {
  sendOTPByEmail,
};
