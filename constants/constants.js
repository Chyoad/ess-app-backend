require('dotenv').config();

module.exports = {
  OTP_LENGTH: 4,
  OTP_CONFIG: {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  },
}