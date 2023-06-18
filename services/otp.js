const otpGenerator = require('otp-generator');
const { OTP_LENGTH, OTP_CONFIG } = require('../constants/constants');

const generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
}

const expirationOTP = () => {
  const expiration = new Date(Date.now() + 60 * 60000).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  return expiration;
}

module.exports = {
  generateOTP, expirationOTP
}