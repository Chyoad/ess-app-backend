const Jwt = require("jsonwebtoken");
const { TokenExpiredError } = Jwt;

// Fungsi untuk menangkap errors
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      "success": "false",
      "message": "Unauthorized! Access Token was expired!"
    });
  }

  return res.sendStatus(401).json({
    "success": false,
    "message": "Unauthorized!"
  });
}

// Fungsi untuk memverifikasi token
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }

    // Token berhasil diverifikasi, menyimpan data yang terdekripsi di dalam objek req.user
    req.user = decoded;
    next();
  });

};

const jwt = {
  verifyToken: verifyToken
};

module.exports = jwt;
