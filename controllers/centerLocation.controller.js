const Location = require('../models').center_location;

// Fungsi untuk memperoleh koordinat lokasi
const getLocation = async (req, res) => {

  const { kode_lokasi } = req.query;

  try {
    const location = await Location.findByPk(kode_lokasi);
    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    return res.status(200).json({ success: true, message: "location found", data: location });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}


module.exports = {
  getLocation
}

