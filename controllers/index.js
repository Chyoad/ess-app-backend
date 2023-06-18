const Auth = require('./auth.controller');
const User = require('./user.controller');
const Location = require('./centerLocation.controller');
const Attendance = require('./transaksiKehadiran.controller');
const JamTerbuang = require('./jamTerbuang.controller');


module.exports = {
  Auth, User, Location, Attendance, JamTerbuang
};