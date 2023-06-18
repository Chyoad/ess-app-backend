const express = require('express');
const router = express.Router();
const { jwt } = require('../middleware');
const { Auth, User, Location, Attendance, JamTerbuang } = require('../controllers');


/* AUTH */
router.post('/login', Auth.login);
router.post('/forget-password', Auth.forgetPassword);
router.post('/verify-otp', Auth.verifyOtp);

// Route yang membutuhkan verifikasi JWT
router.use(jwt.verifyToken);

/* AUTH */
router.post('/update-password', Auth.updatePassword);
router.post('/change-password', Auth.changePassword);


/* USER */
router.get('/user-profile', User.getUserProfile);
router.get('/user-cv', User.getCv);
router.post('/update-profile', User.updateProfile);


/* LOCATION */
router.get('/center-location', Location.getLocation);


/* ATTENDANCE */
router.post('/clock-in', Attendance.clockIn);
router.post('/clock-out', Attendance.clockOut);
router.post('/re-clock-in', Attendance.reClockIn);
router.get('/history-attendance', Attendance.getHistoryAttendance);
router.get('/choose-date-attendance', Attendance.chooseDateAttendance);
router.get('/get-attendance', Attendance.getAttendance);


/* JAM TERBUANG */
router.get('/history-jam-terbuang', JamTerbuang.getHistoryJamTerbuang);
router.get('/choose-date-jam-terbuang', JamTerbuang.chooseDateJamTerbuang);



module.exports = router;
